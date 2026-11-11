"use client";

import type { Messages } from "../lib/localized-content";
import { localizedPath, parseSegments, type Locale } from "../lib/routing";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { studio } from "../lib/content";
import { ContactDetails } from "./contact-details";
import { Icon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";

export function Wordmark() {
  return <span className="wordmark" aria-hidden="true" />;
}

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const hasScrolled = () => window.scrollY > 8;
const serverHasScrolled = () => false;

export function Header({ locale, t, collectionLinks }: { locale: Locale; t: Messages; collectionLinks: { id: string; title: string }[] }) {
  const pathname = usePathname();
  const { path } = parseSegments(pathname.split("/").filter(Boolean));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeToScroll, hasScrolled, serverHasScrolled);
  const overHero = path === "/" && !scrolled && !mobileOpen;
  const productsRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  function closeNavigation() {
    setMobileOpen(false);
    setProductsOpen(false);
  }

  useEffect(() => {
    if (!productsOpen) return;
    function outside(event: PointerEvent) {
      if (!productsRef.current?.contains(event.target as Node)) setProductsOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProductsOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [productsOpen]);

  return (
    <header className="site-header" data-over-hero={overHero ? "" : undefined}>
      <div className="shell header-inner">
        <Link className="brand" href={localizedPath(locale)} aria-label={t.homeLabel} onClick={closeNavigation}><Wordmark /></Link>
        <button className="menu-toggle" type="button" aria-expanded={mobileOpen} aria-controls="main-navigation"
          onClick={() => { setMobileOpen(!mobileOpen); setProductsOpen(false); }}>
          {mobileOpen ? t.close : t.menu} <Icon name={mobileOpen ? "close" : "chevron"} width="18" height="18" />
        </button>
        <nav id="main-navigation" className={mobileOpen ? "main-nav is-open" : "main-nav"} aria-label={t.navigation}>
          <Link href={localizedPath(locale)} onClick={closeNavigation} aria-current={path === "/" ? "page" : undefined}>{t.home}</Link>
          <div className="products-nav" ref={productsRef}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setProductsOpen(false); }}>
            <button ref={trigger} className={path.startsWith("/products") ? "products-trigger is-current" : "products-trigger"}
              type="button" aria-expanded={productsOpen} aria-controls="product-navigation"
              onClick={() => setProductsOpen(!productsOpen)}>
              {t.products} <Icon name="chevron" width="14" height="14" />
            </button>
            {productsOpen && (
              <div className="products-dropdown" id="product-navigation">
                <div className="dropdown-heading">
                  <span>{t.exploreCollections}</span>
                  <Link href={localizedPath(locale, "/products")} onClick={closeNavigation}>{t.viewAll} <Icon name="arrow" width="15" height="15" /></Link>
                </div>
                <div className="dropdown-links">
                  {collectionLinks.map(({ id, title }) => <Link href={localizedPath(locale, `/products/${id}`)} key={id} onClick={closeNavigation}>{title}</Link>)}
                </div>
                <Link href={`${localizedPath(locale)}#design-digital`} className="dropdown-service" onClick={closeNavigation}>
                  {t.dropdownServices} <Icon name="arrow" width="16" height="16" />
                </Link>
              </div>
            )}
          </div>
          <Link href={localizedPath(locale, "/about")} onClick={closeNavigation} aria-current={path === "/about" ? "page" : undefined}>{t.about}</Link>
          <Link href={localizedPath(locale, "/contact")} onClick={closeNavigation} aria-current={path === "/contact" ? "page" : undefined}>{t.contact}</Link>
          <LanguageSwitcher key={`${locale}:${path}`} locale={locale} path={path} label={t.language} onSelect={closeNavigation} />
          <a href={studio.whatsapp} target="_blank" rel="noreferrer" className="mobile-contact">{t.talkWhatsApp} <Icon name="arrow" width="16" height="16" /></a>
        </nav>
        <a className="header-contact" href={studio.whatsapp} target="_blank" rel="noreferrer">
          <Icon name="whatsapp" width="18" height="18" /> {t.talk}
        </a>
      </div>
    </header>
  );
}

export function Footer({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href={localizedPath(locale)} className="brand" aria-label={t.homeLabel}><Wordmark /></Link>
            <p>{t.footerDescription}</p>
            <span className="footer-location">{t.footerLine}</span>
          </div>
          <nav className="footer-nav" aria-label={t.footerNavigation}>
            <span className="method-label">{t.explore}</span>
            <Link href={localizedPath(locale, "/products")}>{t.collections}</Link>
            <Link href={`${localizedPath(locale)}#design-digital`}>{t.designDigital}</Link>
            <Link href={localizedPath(locale, "/about")}>{t.studio}</Link>
            <Link href={localizedPath(locale, "/contact")}>{t.contact}</Link>
            <Link href={localizedPath(locale, "/privacy")}>{t.privacyTitle}</Link>
          </nav>
          <div className="footer-contacts"><ContactDetails t={t} compact /></div>
        </div>
        <div className="footer-end">
          <small>© FOLIA 2026</small>
          <small>{t.business} · {t.location}</small>
        </div>
      </div>
    </footer>
  );
}
