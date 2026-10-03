import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const fields = [
  {
    name: "name",
    label: "Your name",
    placeholder: "e.g. Ananya Sharma",
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "+91 98765 43210",
    type: "tel",
    autoComplete: "tel",
    required: true,
  },
  {
    name: "whatsapp",
    label: "WhatsApp number",
    placeholder: "+91 98765 43210",
    type: "tel",
    autoComplete: "tel",
    required: true,
  },
  {
    name: "city",
    label: "City",
    placeholder: "Where are you based?",
    type: "text",
    autoComplete: "address-level2",
    required: true,
  },
  {
    name: "instagram",
    label: "Instagram ID",
    placeholder: "@yourhandle",
    type: "text",
    autoComplete: "off",
    required: false,
  },
];

function FlowerMark({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M24 23.8C18.1 18.1 19.2 9 24 5c4.8 4 5.9 13.1 0 18.8Zm.2.2C29.9 18.1 39 19.2 43 24c-4 4.8-13.1 5.9-18.8 0Zm-.2.2C29.9 30 28.8 39.1 24 43c-4.8-3.9-5.9-13 0-18.8Zm-.2-.2C18.1 29.9 9 28.8 5 24c4-4.8 13.1-5.9 18.8 0Z"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <circle cx="24" cy="24" r="2.3" fill="currentColor" />
    </svg>
  );
}

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "We couldn't save your details.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fbf4f1] px-4 py-6 text-[#493a3b] sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -left-32 top-36 h-80 w-80 rounded-full bg-[#f3d9d9]/55 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#f4e2d4]/70 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100svh-3rem)] max-w-6xl flex-col sm:min-h-[calc(100vh-5rem)]">
        <header className="flex items-center justify-between gap-3">
          <a
            href="#home"
            className="flex items-center gap-2.5 text-[#674d50]"
            aria-label="Rutanvini Beauty Care home"
          >
            <FlowerMark className="h-9 w-9" />
            <span className="font-serif text-base leading-none tracking-[0.02em] sm:text-lg">
              Rutanvini
              <span className="mt-1 block font-sans text-[9px] uppercase tracking-[0.28em] text-[#98797b]">
                Beauty Care
              </span>
            </span>
          </a>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.24em] text-[#98797b] sm:block">
            A little care, a lot of glow
          </span>
        </header>

        <section
          id="home"
          className="grid flex-1 items-center gap-8 py-8 sm:gap-12 sm:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-16"
        >
          <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8d5d1] bg-white/55 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9a7477] sm:mb-7 sm:px-4 sm:text-[10px] sm:tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#cb9698]" />
              Your beauty journey begins here
            </div>
            <p className="mb-3 font-serif text-lg italic text-[#b17e82]">
              A moment just for you
            </p>
            <h1 className="font-serif text-[clamp(2.75rem,12vw,3.75rem)] leading-[1.08] tracking-[-0.035em] text-[#513f40]">
              Let&apos;s get to
              <span className="block italic text-[#bd8589]">know you.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#8c7776] lg:mx-0">
              Beautiful things begin with a conversation. Share a few details
              and we&apos;ll be in touch to help you find your glow.
            </p>
            <div className="mt-10 hidden items-center gap-4 lg:flex">
              <div className="flex -space-x-2">
                {["A", "M", "S"].map((initial, index) => (
                  <span
                    key={initial}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 border-[#fbf4f1] font-serif text-xs text-[#7d5d60] ${
                      index === 1 ? "bg-[#ead3cd]" : "bg-[#f0dfdc]"
                    }`}
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <p className="text-xs leading-5 text-[#987f7e]">
                Thoughtful beauty, made
                <br />
                personal for you
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[510px]">
            <div className="rounded-2xl border border-white/80 bg-[#fffdfb]/90 p-5 shadow-[0_24px_80px_-35px_rgba(133,91,91,0.28)] sm:rounded-[1.75rem] sm:p-10">
              <div className="mb-6 flex items-start justify-between gap-3 sm:mb-8 sm:gap-4">
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#bd8589]">
                    We&apos;re all ears
                  </p>
                  <h2 className="font-serif text-3xl tracking-[-0.02em] text-[#594546]">
                    Rutanvini Beauty Care
                  </h2>
                  <p className="mt-2 text-xs leading-5 text-[#a28d8a]">
                    Fill in your details and let&apos;s make your beauty journey personal and memorable. We&apos;ll reach out to you soon.
                  </p>
                </div>
                <FlowerMark className="mt-1 h-10 w-10 shrink-0 text-[#d3a5a4]" />
              </div>

              {submitted ? (
                <div
                  role="status"
                  className="rounded-2xl border border-[#ead4d1] bg-[#fbf3f0] px-5 py-8 text-center"
                >
                  <FlowerMark className="mx-auto mb-4 h-10 w-10 text-[#bd8589]" />
                  <h3 className="font-serif text-2xl text-[#594546]">
                    Thank you!!!
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#8c7776]">
                    Your details have been sent, and a confirmation email is on
                    its way. We can&apos;t wait to connect with you.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setSubmitError("");
                    }}
                    className="mt-5 text-xs font-semibold text-[#a46f74] underline decoration-[#d8b0ae] underline-offset-4 transition hover:text-[#80585b]"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="mb-1.5 block text-[11px] font-semibold tracking-[0.025em] text-[#735e5e]"
                      >
                        {field.label}
                        {field.required && (
                          <span className="ml-1 text-[#bf8589]">*</span>
                        )}
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        autoComplete={field.autoComplete}
                        required={field.required}
                        className="min-h-11 w-full rounded-xl border border-[#eee3df] bg-[#fffdfb] px-4 py-3 text-base text-[#493a3b] outline-none transition placeholder:text-[#c2b2ae] hover:border-[#e3cbc7] focus:border-[#c99598] focus:ring-4 focus:ring-[#f3e5e3]/70 sm:text-sm"
                      />
                    </div>
                  ))}
                  {submitError && (
                    <p
                      role="alert"
                      className="rounded-lg bg-[#fbefed] px-3 py-2 text-xs leading-5 text-[#9c5558]"
                    >
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#bd8589] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_8px_20px_-10px_rgba(153,94,99,0.7)] transition hover:-translate-y-0.5 hover:bg-[#a97075] focus:outline-none focus:ring-4 focus:ring-[#efd9d8] active:translate-y-0 disabled:cursor-wait disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending your details..." : "Send your details"}
                    {!isSubmitting && (
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    )}
                  </button>
                  <p className="pt-1 text-center text-[10px] leading-5 text-[#ae9c98]">
                    We&apos;ll email you a confirmation and use your details to get in touch.
                  </p>
                </form>
              )}
            </div>
            <p className="mt-5 text-center text-[10px] tracking-wide text-[#aa9491]">
               Rutanvini Beauty Care
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
