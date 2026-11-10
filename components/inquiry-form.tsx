"use client";

import { createContext, useContext, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { catalogPath, collections, inquiryTypes, studio } from "../lib/content";

const CatalogContext = createContext<(() => void) | null>(null);

export function CatalogButton({ children, className }: { children: ReactNode; className?: string }) {
  const open = useContext(CatalogContext);
  return <button type="button" className={className} onClick={open ?? undefined} aria-haspopup="dialog">{children}</button>;
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [session, setSession] = useState(0);

  function open() {
    setSession((current) => current + 1);
    dialog.current?.showModal();
  }

  return (
    <CatalogContext.Provider value={open}>
      {children}
      <dialog ref={dialog} className="catalog-dialog" aria-labelledby="catalog-title"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="dialog-inner">
          <button className="dialog-close" type="button" aria-label="Close catalog request" onClick={() => dialog.current?.close()}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
          <p className="eyebrow">The Folia catalog</p>
          <h2 id="catalog-title">Discover the <em>FOLIA Collection.</em></h2>
          <p>Leave your details and we’ll share our catalog of customizable hospitality products and finishes.</p>
          <InquiryForm key={session} mode="catalog" />
          <a href={catalogPath} className="text-link dialog-download" download>Download the PDF <span aria-hidden="true">↓</span></a>
        </div>
      </dialog>
    </CatalogContext.Provider>
  );
}

export function InquiryForm({ mode }: { mode: "catalog" | "contact" }) {
  const isCatalog = mode === "catalog";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const request = useRef<{ body: string; id: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "success") return;
    const form = event.currentTarget;
    const formData = new FormData(form);
    const products = formData.getAll("products").filter(Boolean);
    const fields = Object.fromEntries(formData);
    const body = JSON.stringify({ ...fields, products, mode });

    if (request.current?.body !== body) {
      request.current = { body, id: crypto.randomUUID() };
    }

    setStatus("sending");
    setError("");

    try {
      const result = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": request.current.id },
        body,
      });
      const response = await result.json();
      if (!result.ok || response.ok !== true) {
        throw new Error(response.error || "We couldn’t send your request. Please try again.");
      }
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error && cause.name === "Error" ? cause.message : "We couldn’t send your request. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return <div className="form-success" role="status">
      <h3>{isCatalog ? "Catalog request received." : "Thank you for getting in touch."}</h3>
      <p>We’ll follow up at the email address you provided.</p>
    </div>;
  }

  return (
    <form className="inquiry-form" onSubmit={submit} aria-busy={status === "sending"}>
      <fieldset disabled={status === "sending"}>
        <div className="form-grid">
          <label>{isCatalog ? "Name" : "Full Name"} <span aria-hidden="true">*</span><input name="name" autoComplete="name" maxLength={120} required /></label>
          <label>Business Name<input name="business" autoComplete="organization" maxLength={160} /></label>
          <label className={isCatalog ? "form-wide" : undefined}>Email Address <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
          {isCatalog ? (
            <label className="form-wide">Product Interest<select name="products" defaultValue="">
              <option value="">Select a collection</option>
              {collections.map(({ id, title }) => <option value={id} key={id}>{title}</option>)}
            </select></label>
          ) : (
            <>
              <label>Phone Number<input name="phone" type="tel" autoComplete="tel" maxLength={50} /></label>
              <label>Inquiry Type <span aria-hidden="true">*</span><select name="type" defaultValue="" required>
                <option value="" disabled>Select a topic</option>
                {inquiryTypes.map((type) => <option key={type}>{type}</option>)}
              </select></label>
              <label>Estimated Quantity<input name="quantity" type="number" inputMode="numeric" min={1} max={10000000} step={1} /></label>
              <fieldset className="form-wide interest-fields">
                <legend>Products of Interest</legend>
                <div className="checkbox-grid">
                  {collections.map(({ id, title }) => <label className="check-option" key={id}><input type="checkbox" name="products" value={id} />{title}</label>)}
                </div>
              </fieldset>
              <label className="form-wide">Message<textarea name="message" rows={4} maxLength={4000} /></label>
            </>
          )}
        </div>
        <div className="form-trap" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p className="privacy-note">We’ll use your details to respond to this request.</p>
        {error && <p className="form-error" role="alert">{error} {studio.email && <a href={`mailto:${studio.email}`}>Email Folia directly.</a>}</p>}
        <button className="button button-primary form-submit" type="submit">
          {status === "sending" ? "Sending…" : isCatalog ? "Request Catalog" : "Send Inquiry"}
        </button>
      </fieldset>
    </form>
  );
}
