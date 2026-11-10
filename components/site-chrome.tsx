"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, studio } from "../lib/content";
import { Arrow } from "./editorial";
import { CatalogButton } from "./inquiry-form";

function Wordmark() {
  return <span className="wordmark" aria-hidden="true" />;
}

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuOpen = openPath === pathname;

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Folia home" onClick={() => setOpenPath(null)}><Wordmark /></Link>
        <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation"
          onClick={() => setOpenPath(menuOpen ? null : pathname)}>
          {menuOpen ? "Close" : "Menu"} <span aria-hidden="true" className={menuOpen ? "menu-icon is-open" : "menu-icon"} />
        </button>
        <nav id="main-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {navigation.map(({ href, label }) => (
            <Link href={href} key={href} aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpenPath(null)}>{label}</Link>
          ))}
          <CatalogButton className="button button-outline mobile-catalog">Request Catalog <Arrow diagonal /></CatalogButton>
        </nav>
        <CatalogButton className="button button-outline desktop-catalog">Request Catalog <Arrow diagonal /></CatalogButton>
      </div>
    </header>
  );
}

export function ContactDetails() {
  return (
    <>
      {studio.email ? <a href={`mailto:${studio.email}`}>{studio.email}</a> : <Link href="/contact#inquiry">Email Folia</Link>}
      {studio.instagram ? <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></a> : null}
      <a href={studio.whatsapp} target="_blank" rel="noreferrer" aria-label={`WhatsApp Folia at ${studio.phone}`}>WhatsApp {studio.phone} <Arrow diagonal /></a>
      <span>{studio.location}</span>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="Folia home"><Wordmark /></Link>
            <p>Thoughtful design for exceptional hospitality.</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <p className="eyebrow">Explore</p>
            {navigation.slice(1).map(({ href, label }) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
          <div className="footer-links">
            <p className="eyebrow">Studio</p>
            <ContactDetails />
          </div>
        </div>
        <div className="footer-end">
          <small>© FOLIA 2026. All rights reserved.</small>
          <small>Hospitality design &amp; supply</small>
        </div>
      </div>
    </footer>
  );
}
