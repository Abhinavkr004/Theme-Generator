"use client";

import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { useState } from "react";

// Demonstrates the themed form states a reviewer looks for: resting input,
// inline validation error, and a success confirmation. All local state.

export function PreviewForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && email.length > 0 && !valid;

  if (submitted) {
    return (
      <div
        className="flex items-center gap-3 border border-success/40 bg-success/10 p-4"
        style={{ borderRadius: "calc(var(--radius) * 0.75)" }}
      >
        <CheckCircle size={22} weight="fill" className="shrink-0 text-success" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-text">You are on the list</p>
          <p className="text-sm text-text-muted">
            We sent a confirmation to {email}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        setTouched(true);
        if (valid) setSubmitted(true);
      }}
      noValidate
    >
      <label htmlFor="preview-email" className="text-sm font-medium text-text">
        Work email
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="preview-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="you@company.com"
          aria-invalid={showError}
          aria-describedby={showError ? "preview-email-error" : undefined}
          className={`w-full border bg-surface px-3.5 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent ${
            showError ? "border-danger" : "border-border"
          }`}
          style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
        />
        <button
          type="submit"
          className="shrink-0 bg-accent px-5 py-2.5 text-sm font-semibold text-accent-text transition-colors hover:bg-accent-hover active:scale-[0.98]"
          style={{ borderRadius: "calc(var(--radius) * 0.6)" }}
        >
          Request access
        </button>
      </div>
      {showError ? (
        <p id="preview-email-error" className="flex items-center gap-1.5 text-sm text-danger">
          <WarningCircle size={15} weight="fill" aria-hidden />
          Enter a valid email address.
        </p>
      ) : (
        <p className="text-sm text-text-muted">No spam. One email when your workspace is ready.</p>
      )}
    </form>
  );
}
