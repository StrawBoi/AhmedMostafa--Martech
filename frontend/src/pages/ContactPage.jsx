import { useState } from "react";
import axios from "axios";
import { ArrowUpRight, Mail, Loader2, Download } from "lucide-react";
import { toast } from "sonner";
import useReveal from "@/hooks/useReveal";
import { profile } from "@/lib/data";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initialForm = {
  name: "",
  email: "",
  company: "",
  role_type: "",
  message: "",
};

export default function ContactPage() {
  useReveal();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please share your name.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "That email looks off.";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Tell me a little more (10+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent — I'll reply within 48 hours.");
      setForm(initialForm);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(
        typeof detail === "string"
          ? detail
          : "Couldn't send through the form. Try the email link below."
      );
    } finally {
      setLoading(false);
    }
  };

  const mailtoFallback = `mailto:${profile.email}?subject=${encodeURIComponent(
    "Internship opportunity"
  )}&body=${encodeURIComponent(
    `Hi Ahmed,\n\n${form.message || "I'd like to talk about an internship opportunity."}\n\n— ${form.name || ""}`
  )}`;

  return (
    <main data-testid="contact-page" className="pt-12 md:pt-20">
      <section className="container-editorial pb-12 md:pb-16">
        <p className="overline mb-5 reveal">Contact</p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] max-w-4xl reveal">
          Tell me about the role —{" "}
          <span className="italic text-terracotta">
            I'll tell you if I'm a fit.
          </span>
        </h1>
        <p
          className="mt-6 max-w-2xl text-base md:text-lg text-foreground/75 leading-relaxed reveal"
          style={{ transitionDelay: "120ms" }}
        >
          Drop a few lines about the team, the timing, and what kind of intern
          you're looking for. I read everything personally and reply within
          48 hours.
        </p>
      </section>

      <section className="container-editorial pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <form
          onSubmit={onSubmit}
          data-testid="contact-form"
          className="lg:col-span-7 space-y-7 reveal"
          noValidate
        >
          <Field
            id="name"
            label="Your name"
            value={form.name}
            onChange={update("name")}
            error={errors.name}
            testId="contact-name"
            required
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={update("email")}
            error={errors.email}
            testId="contact-email"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            <Field
              id="company"
              label="Company / team"
              value={form.company}
              onChange={update("company")}
              testId="contact-company"
            />
            <Field
              id="role_type"
              label="Role type"
              placeholder="Marketing analyst, growth, research…"
              value={form.role_type}
              onChange={update("role_type")}
              testId="contact-role"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="overline block mb-3"
            >
              Message *
            </label>
            <textarea
              id="message"
              rows={6}
              value={form.message}
              onChange={update("message")}
              data-testid="contact-message"
              className="w-full bg-transparent border-b border-hairline focus:border-terracotta focus:outline-none py-2 text-base resize-none transition-colors"
              placeholder="A few lines about the role, team, and timing."
            />
            {errors.message && (
              <p className="text-xs text-destructive mt-2">{errors.message}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              data-testid="contact-submit"
              className="btn-primary disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send message <ArrowUpRight size={14} />
                </>
              )}
            </button>
            <a
              href={mailtoFallback}
              data-testid="contact-mailto-fallback"
              className="text-sm link-underline text-foreground/80"
            >
              Or send via email instead
            </a>
          </div>
        </form>

        <aside className="lg:col-span-5 lg:pl-10 lg:border-l border-hairline">
          <div className="space-y-10 reveal" style={{ transitionDelay: "100ms" }}>
            <div>
              <p className="overline mb-3">Direct</p>
              <a
                href={`mailto:${profile.email}`}
                data-testid="contact-email-direct"
                className="font-serif text-2xl link-underline"
              >
                {profile.email}
              </a>
              <p className="text-sm text-subtle mt-2 inline-flex items-center gap-2">
                <Mail size={14} /> Replies within 48 hours
              </p>
            </div>

            <div>
              <p className="overline mb-3">Elsewhere</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 link-underline"
                  >
                    LinkedIn <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.cvUrl}
                    className="inline-flex items-center gap-1.5 link-underline"
                  >
                    <Download size={14} /> Download CV
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="overline mb-3">Currently looking for</p>
              <p className="font-serif text-xl leading-snug">
                Marketing, growth, research or analytics internships across
                Belgium and Europe — Summer 2026.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  testId,
  required = false,
}) {
  return (
    <div>
      <label htmlFor={id} className="overline block mb-3">
        {label}
        {required && " *"}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={testId}
        className="w-full bg-transparent border-b border-hairline focus:border-terracotta focus:outline-none py-2 text-base transition-colors"
      />
      {error && <p className="text-xs text-destructive mt-2">{error}</p>}
    </div>
  );
}
