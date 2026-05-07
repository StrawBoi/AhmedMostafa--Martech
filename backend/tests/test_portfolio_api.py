"""Backend API tests for Ahmed Mostafa Portfolio API (iteration 2).

Adds tests for:
  - Honeypot ('website' field) → 201 returned, but message NOT persisted.
  - Rate limiting → 6th submission within an hour from same IP gets 429.
  - GET /api/contact must NOT leak _id or _ip.
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root regression ----------
class TestRoot:
    def test_root_welcome(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Ahmed" in data["message"] or "Portfolio" in data["message"]


# ---------- Status regression ----------
class TestStatus:
    def test_create_and_list_status(self, client):
        name = f"TEST_status_{uuid.uuid4().hex[:8]}"
        r = client.post(f"{API}/status", json={"client_name": name})
        assert r.status_code == 200
        body = r.json()
        assert body["client_name"] == name
        assert "id" in body and "timestamp" in body

        r2 = client.get(f"{API}/status")
        assert r2.status_code == 200
        rows = r2.json()
        assert isinstance(rows, list)
        assert any(row.get("client_name") == name for row in rows)
        for row in rows:
            assert "_id" not in row


# ---------- Contact validation ----------
class TestContactValidation:
    def test_create_contact_201_and_no_internal_fields(self, client):
        payload = {
            "name": "TEST_Recruiter",
            "email": f"test+{uuid.uuid4().hex[:6]}@example.com",
            "company": "TestCorp",
            "role_type": "Marketing analyst",
            "message": "Hi Ahmed, we'd love to chat about a summer internship.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        # Internal fields must not leak
        assert "_id" not in data
        assert "_ip" not in data
        assert "website" not in data
        for k in ["id", "name", "email", "company", "role_type", "message", "created_at"]:
            assert k in data
        assert data["name"] == payload["name"]

    def test_invalid_email_422(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "TEST",
            "email": "not-an-email",
            "message": "This is a long enough message body.",
        })
        assert r.status_code == 422

    def test_short_message_422(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "TEST",
            "email": "ok@example.com",
            "message": "short",
        })
        assert r.status_code == 422

    def test_empty_name_422(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "",
            "email": "ok@example.com",
            "message": "This is a long enough message body.",
        })
        assert r.status_code == 422


# ---------- Honeypot ----------
class TestHoneypot:
    def test_honeypot_returns_201_but_does_not_persist(self, client):
        # Get current count
        r0 = client.get(f"{API}/contact")
        assert r0.status_code == 200
        before = len(r0.json())

        payload = {
            "name": "TEST_BotHoneypot",
            "email": f"bot+{uuid.uuid4().hex[:6]}@example.com",
            "message": "I am a bot filling the honeypot field — should be dropped.",
            "website": "https://spammy-bot.example/",
        }
        r = client.post(f"{API}/contact", json=payload)
        # Server returns 201 to keep bots silent
        assert r.status_code == 201, r.text
        data = r.json()
        # Response model excludes the website field too
        assert "website" not in data

        # Verify NOT persisted
        r2 = client.get(f"{API}/contact")
        assert r2.status_code == 200
        rows = r2.json()
        assert len(rows) == before, "Honeypot submission should not be persisted"
        # Ensure the bot's message is not in the list
        assert not any(row.get("name") == "TEST_BotHoneypot" for row in rows)


# ---------- Rate limit ----------
class TestRateLimit:
    """5 submissions allowed per IP per hour, 6th must be 429."""

    def test_rate_limit_429_within_six(self, client):
        # Earlier tests in the suite may have used part of the budget already.
        # Push up to 6 requests and assert (a) we always hit a 429 within the
        # window, (b) all responses prior to the first 429 are 201, and
        # (c) the 429 has the expected structured "detail" message.
        seen = []
        first_429_index = None
        for i in range(6):
            payload = {
                "name": f"TEST_RL_{i}",
                "email": f"rl{i}+{uuid.uuid4().hex[:6]}@example.com",
                "message": f"Rate limit test message number {i}, plenty of chars here.",
            }
            r = client.post(f"{API}/contact", json=payload)
            seen.append(r.status_code)
            if r.status_code == 429:
                first_429_index = i
                # Validate detail shape
                body = r.json()
                assert "detail" in body
                assert isinstance(body["detail"], str) and len(body["detail"]) > 0
                break
        assert first_429_index is not None, f"Expected a 429 within 6 attempts, got {seen}"
        # Everything before the 429 must have been a 201
        assert all(s == 201 for s in seen[:first_429_index]), seen
        # The number of 201s before 429 should fit the 5/hour window (some may
        # have been consumed earlier in the suite).
        assert first_429_index <= 5, seen


# ---------- List response shape ----------
class TestContactList:
    def test_list_no_id_no_ip_sorted_desc(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        for row in rows:
            assert "_id" not in row
            assert "_ip" not in row
            assert "id" in row and "created_at" in row
        timestamps = [row["created_at"] for row in rows]
        assert timestamps == sorted(timestamps, reverse=True)
