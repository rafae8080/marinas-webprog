import { useState } from "react";
import CornerMarks from "../components/ui/CornerMarks";
import SectionHeader from "../components/ui/SectionHeader";
import TodoText from "../components/ui/TodoText";
import { contact } from "../data/site";
import { sendMessage } from "../services/ContactService";
import Section from "./Section";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 80, subject: 120, body: 4000 };
const empty = { name: "", email: "", subject: "", body: "", company: "" };

const label = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted";
const inputBase =
  "mt-2 w-full border bg-bg px-3 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-ink";

// Same rules as the server (controllers/contactController.js)
const validate = (form) => {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const body = form.body.trim();
  if (!name) errors.name = "Name is required.";
  else if (name.length > LIMITS.name) errors.name = `Name must be ${LIMITS.name} characters or fewer.`;
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  if (form.subject.trim().length > LIMITS.subject) errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`;
  if (body.length < 10) errors.body = "Message must be at least 10 characters.";
  else if (body.length > LIMITS.body) errors.body = `Message must be ${LIMITS.body} characters or fewer.`;
  return errors;
};

const Field = ({ id, labelText, error, optional, children }) => (
  <div>
    <label htmlFor={id} className={label}>
      {labelText}
      {optional && <span className="normal-case tracking-normal"> (optional)</span>}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} className="mt-1.5 font-mono text-xs text-accent">
        {error}
      </p>
    )}
  </div>
);

const DirectLink = ({ href, labelText, value, external }) => (
  <li className="border-t border-line py-4">
    <p className={label}>{labelText}</p>
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="mt-1 inline-block break-all font-display text-lg font-medium tracking-[-0.02em] text-ink underline-offset-4 hover:text-accent hover:underline"
    >
      {value}
    </a>
  </li>
);

const Contact = () => {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorText, setErrorText] = useState("");

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid field
      const first = ["name", "email", "subject", "body"].find((f) => found[f]);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      await sendMessage(form);
      setStatus("sent");
      setForm(empty);
    } catch (err) {
      const res = err.response;
      if (res?.status === 400 && res.data?.errors) {
        setErrors(res.data.errors);
        setStatus("idle");
        return;
      }
      setErrorText(
        res?.status === 429
          ? "Too many messages from this connection. Please try again later, or email me directly."
          : "Your message couldn't be sent. Please email me directly.",
      );
      setStatus("error");
    }
  };

  const fieldProps = (field) => ({
    id: `contact-${field}`,
    name: field,
    value: form[field],
    onChange: update(field),
    "aria-invalid": errors[field] ? "true" : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    className: `${inputBase} ${errors[field] ? "border-accent" : "border-line"}`,
  });

  return (
    <Section id="contact">
      <SectionHeader
        code="SEC-08"
        title="Transmit"
        kicker="Hiring, a project, or a question about something here. Messages come straight to me."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative border border-line bg-surface p-5 sm:p-8">
          <CornerMarks />
          {status === "sent" ? (
            <div role="status" className="py-10">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-ok">● Message received</p>
              <p className="mt-3 font-display text-2xl font-medium tracking-[-0.02em] text-ink">
                Thanks. I'll reply within 48h.
              </p>
              {/* TODO(rafael): confirm the 48h reply time */}
              <p className="mt-2">
                <TodoText value="TODO(rafael): confirm the 48h reply time" />
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-accent underline-offset-4 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="contact-name" labelText="Name" error={errors.name}>
                  <input type="text" autoComplete="name" maxLength={LIMITS.name} {...fieldProps("name")} />
                </Field>
                <Field id="contact-email" labelText="Email" error={errors.email}>
                  <input type="email" autoComplete="email" inputMode="email" {...fieldProps("email")} />
                </Field>
              </div>
              <Field id="contact-subject" labelText="Subject" optional error={errors.subject}>
                <input type="text" maxLength={LIMITS.subject} {...fieldProps("subject")} />
              </Field>
              <Field id="contact-body" labelText="Message" error={errors.body}>
                <textarea rows={6} maxLength={LIMITS.body} {...fieldProps("body")} />
                <p className="mt-1 text-right font-mono text-[10px] text-muted" aria-hidden="true">
                  {form.body.length} / {LIMITS.body}
                </p>
              </Field>

              {/* Honeypot: hidden from people and screen readers; bots tend to fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={update("company")}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex min-h-11 items-center gap-2 bg-accent px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-on-accent transition-colors hover:bg-accent-deep disabled:opacity-60"
                >
                  {status === "sending" ? "Transmitting…" : "Transmit ▸"}
                </button>
              </div>

              <div aria-live="polite" className="min-h-6">
                {Object.keys(errors).some((k) => errors[k]) && (
                  <p className="font-mono text-xs text-accent">Please fix the highlighted fields.</p>
                )}
                {status === "error" && (
                  <p role="alert" className="text-sm leading-relaxed text-ink">
                    {errorText}{" "}
                    <a href={`mailto:${contact.email}`} className="text-accent underline underline-offset-4">
                      {contact.email}
                    </a>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        <aside aria-label="Direct contact">
          <p className={label}>Or reach me directly</p>
          <ul className="mt-3 border-b border-line">
            <DirectLink href={`mailto:${contact.email}`} labelText="Email" value={contact.email} />
            <DirectLink href={contact.linkedin} labelText="LinkedIn" value="rafael-marinas" external />
            <DirectLink href={contact.github} labelText="GitHub" value="rafae8080" external />
          </ul>
        </aside>
      </div>
    </Section>
  );
};

export default Contact;
