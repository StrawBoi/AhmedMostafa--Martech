import { useState } from "react";
import { ArrowUpRight, Loader2, Clock } from "lucide-react";
import { toast } from "sonner";
import useReveal from "@/hooks/useReveal";
import { profile } from "@/lib/data";
import CVButton from "@/components/CVButton";
import { track, Events } from "@/lib/analytics";
import Seo from "@/components/Seo";

// Formspree form endpoint — set your form ID from https://formspree.io/
// Sign up, create a form, and replace with your form ID (e.g., f_mepwvqj)
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID || "ahmed.ha.mahmoud@outlook.com";
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

const initialForm = {
  name: "",
  email: "",
  company: "",
  role_type: "",
  message: "",
  // Honeypot — humans should leave this empty.
  website: "",
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

    // Honeypot check — bots often fill hidden fields
    if (form.website) {
      // Silently succeed to fool bots
      toast.success("Message sent — I'll reply within 48 hours.");
      setForm(initialForm);
      return;
    }

    track(Events.CONTACT_SUBMIT, {
      has_company: Boolean(form.company),
      role_type: form.role_type || "unspecified",
    });
    setLoading(true);

    try {
      // Submit to Formspree (no backend required)
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || "Not provided",
          role_type: form.role_type || "Not specified",
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Formspree error: ${response.status}`);
      }

      track(Events.CONTACT_SUBMIT_SUCCESS);
      toast.success("Message sent — I'll reply within 48 hours.");
      setForm(initialForm);
    } catch (err) {
      console.error("Contact form error:", err);
      track(Events.CONTACT_SUBMIT_ERROR, { source: "formspree" });
      toast.error(
        "Something went wrong sending your message. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="contact-page" className="pt-12 md:pt-20">
      <Seo
        title="Contact Ahmed Mohsen Mostafa | Internship Opportunities in Belgium & Europe"
        description="Reach out to Ahmed Mohsen Mostafa about marketing, research, analytics, or growth internship opportunities across Belgium and Europe. Replies within 48 hours."
        canonicalPath="/contact"
        image="/og-image.svg"
        imageAlt="Ahmed Mohsen Mostafa contact page preview"
        keywords={[
          "contact marketing intern",
          "Belgium internship contact",
          "Europe internship contact",
        ]}
      />
      <section className="container-editorial pb-12 md:pb-16">
        <p className="overline mb-5 reveal">CONTACT</p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02] max-w-4xl reveal">
          Tell me about the opportunity.
        </h1>
        <p
          className="mt-6 max-w-2xl text-base text-foreground/75 leading-relaxed reveal"
          style={{ transitionDelay: "120ms" }}
        >
          Use the form below to reach out. A few lines about the role, team, and timing is enough — I read everything personally and reply within 48 hours.
        </p>
      </section>

      <section className="container-editorial pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <form
          onSubmit={onSubmit}
          data-testid="contact-form"
          className="lg:col-span-7 space-y-7 reveal"
          noValidate
        >
          {/* Honeypot — visually hidden, ignored by humans, often filled by bots. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              top: "auto",
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <label htmlFor="website">Website (leave empty)</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={update("website")}
            />
          </div>

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
            <p className="text-xs text-subtle">
              Your details are stored privately. Replies go out within 48 hours.
            </p>
          </div>
        </form>

        <aside className="lg:col-span-5 lg:pl-10 lg:border-l border-hairline">
          <div className="space-y-10 reveal" style={{ transitionDelay: "100ms" }}>
            <div>
              <p className="overline mb-3">How to reach me</p>
              <p className="font-serif text-2xl leading-snug">
                The contact form is the primary channel — it routes straight
                to me.
              </p>
              <p className="text-sm text-subtle mt-3">
                Direct email is available on request once we've connected.
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
                    onClick={() =>
                      track(Events.LINKEDIN_CLICKED, { source: "contact_page" })
                    }
                    data-testid="contact-linkedin"
                    className="inline-flex items-center gap-1.5 link-underline"
                  >
                    LinkedIn <ArrowUpRight size={14} />
                  </a>
                </li>
                <li>
                  <CVButton
                    variant="footer"
                    source="contact_page"
                    testId="contact-download-cv"
                  />
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

            <div className="flex items-center gap-2 text-xs text-subtle">
              <Clock size={12} /> Replies within 48 hours, including weekends.
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
