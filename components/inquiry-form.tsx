"use client";

import type { Messages } from "../lib/localized-content";
import { createContext, useContext, useRef } from "react";
import type { ReactNode } from "react";
import { emailUrl, whatsappUrl } from "../lib/content";
import { Icon } from "./icons";

const CatalogContext = createContext<(() => void) | null>(null);

export function CatalogButton({ children, className }: { children: ReactNode; className?: string }) {
  const open = useContext(CatalogContext);
  return <button type="button" className={className} onClick={open ?? undefined} aria-haspopup="dialog">{children}</button>;
}

export function CatalogProvider({ children, t }: { children: ReactNode; t: Messages }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const message = t.catalogMessage;

  return (
    <CatalogContext.Provider value={() => dialog.current?.showModal()}>
      {children}
      <dialog ref={dialog} className="catalog-dialog" aria-labelledby="catalog-title"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="dialog-inner">
          <button className="dialog-close" type="button" aria-label={t.catalogClose} onClick={() => dialog.current?.close()}>
            <Icon name="close" />
          </button>
          <p className="eyebrow">{t.catalogCollection}</p>
          <h2 id="catalog-title">{t.catalogTitle}</h2>
          <p>{t.catalogIntro}</p>
          <a className="button button-primary" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" width="19" height="19" /> {t.catalogWhatsApp}
          </a>
          <a className="button button-outline" href={emailUrl(`Folia | ${t.catalogSubject}`, message)}>
            <Icon name="mail" width="18" height="18" /> {t.catalogEmail}
          </a>
          <span className="dialog-note">{t.catalogNote}</span>
        </div>
      </dialog>
    </CatalogContext.Provider>
  );
}
