"""Backend API tests for Ahmed Mostafa Portfolio API."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://ahmed-analytics-eu.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
class TestRoot:
    def test_root_welcome(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Ahmed" in data["message"] or "Portfolio" in data["message"]


# ---------- Status ----------
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


# ---------- Contact ----------
class TestContact:
    def test_create_contact_201(self, client):
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
        for k in ["id", "name", "email", "company", "role_type", "message", "created_at"]:
            assert k in data, f"missing {k}"
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["company"] == payload["company"]
        assert data["role_type"] == payload["role_type"]
        assert data["message"] == payload["message"]
        assert isinstance(data["id"], str) and len(data["id"]) > 0

    def test_create_contact_minimal(self, client):
        payload = {
            "name": "TEST_Min",
            "email": f"min+{uuid.uuid4().hex[:6]}@example.com",
            "message": "Short but valid msg.",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 201
        data = r.json()
        assert data["company"] is None
        assert data["role_type"] is None

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

    def test_list_contact_sorted_desc_no_id(self, client):
        # create two with delay-able ordering using posts in sequence
        payloads = []
        for i in range(2):
            p = {
                "name": f"TEST_Order_{i}",
                "email": f"order{i}+{uuid.uuid4().hex[:6]}@example.com",
                "message": f"Message for ordering test number {i} please.",
            }
            r = client.post(f"{API}/contact", json=p)
            assert r.status_code == 201
            payloads.append(r.json())

        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        assert len(rows) >= 2
        # No _id leak
        for row in rows:
            assert "_id" not in row
            assert "id" in row and "created_at" in row
        # Sorted desc by created_at
        timestamps = [row["created_at"] for row in rows]
        assert timestamps == sorted(timestamps, reverse=True)
