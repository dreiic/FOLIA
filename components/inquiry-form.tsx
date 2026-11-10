"use client";

import { createContext, useContext, useRef } from "react";
import type { ReactNode } from "react";
import { emailUrl, whatsappUrl } from "../lib/content";
import { Icon } from "./icons";

const CatalogContext = createContext<(() => void) | null>(null);

export function CatalogButton({ children, className }: { children: ReactNode; className?: string }) {
  const open = useContext(CatalogContext);
  return <button type="button" className={className} onClick={open ?? undefined} aria-haspopup="dialog">{children}</button>;
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const message = "Hello Folia, I’d like to receive your hospitality product catalog and discuss the options for my venue.";

  return (
    <CatalogContext.Provider value={() => dialog.current?.showModal()}>
      {children}
      <dialog ref={dialog} className="catalog-dialog" aria-labelledby="catalog-title"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="dialog-inner">
          <button className="dialog-close" type="button" aria-label="Close catalog request" onClick={() => dialog.current?.close()}>
            <Icon name="close" />
          </button>
          <p className="eyebrow">The Folia collection</p>
          <h2 id="catalog-title">Let’s find what<br />works for you.</h2>
          <p>Tell us a little about your venue. We’ll send you our catalog and help you choose products, materials, and finishes.</p>
          <a className="button button-primary" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" width="19" height="19" /> Request on WhatsApp
          </a>
          <a className="button button-outline" href={emailUrl("Folia | Catalog request", message)}>
            <Icon name="mail" width="18" height="18" /> Request by email
          </a>
          <span className="dialog-note">A personal conversation about your project.</span>
        </div>
      </dialog>
    </CatalogContext.Provider>
  );
}
