"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { collections, studio } from "../lib/content";
import { ContactDetails } from "./contact-details";
import { Icon } from "./icons";

export function Wordmark() {
  return <span className="wordmark" aria-hidden="true" />;
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
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
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Folia home" onClick={closeNavigation}><Wordmark /></Link>
        <button className="menu-toggle" type="button" aria-expanded={mobileOpen} aria-controls="main-navigation"
          onClick={() => { setMobileOpen(!mobileOpen); setProductsOpen(false); }}>
          {mobileOpen ? "Close" : "Menu"} <Icon name={mobileOpen ? "close" : "chevron"} width="18" height="18" />
        </button>
        <nav id="main-navigation" className={mobileOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          <Link href="/" onClick={closeNavigation} aria-current={pathname === "/" ? "page" : undefined}>Home</Link>
          <div className="products-nav" ref={productsRef}
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setProductsOpen(false); }}>
            <button ref={trigger} className={pathname.startsWith("/products") ? "products-trigger is-current" : "products-trigger"}
              type="button" aria-expanded={productsOpen} aria-controls="product-navigation"
              onClick={() => setProductsOpen(!productsOpen)}>
              Products <Icon name="chevron" width="14" height="14" />
            </button>
            {productsOpen && (
              <div className="products-dropdown" id="product-navigation">
                <div className="dropdown-heading">
                  <span>Explore the collections</span>
                  <Link href="/products" onClick={closeNavigation}>View all <Icon name="arrow" width="15" height="15" /></Link>
                </div>
                <div className="dropdown-links">
                  {collections.map(({ id, title }) => <Link href={`/products/${id}`} key={id} onClick={closeNavigation}>{title}</Link>)}
                </div>
                <Link href="/#design-digital" className="dropdown-service" onClick={closeNavigation}>
                  Menu redesign, QR menus &amp; websites <Icon name="arrow" width="16" height="16" />
                </Link>
              </div>
            )}
          </div>
          <Link href="/about" onClick={closeNavigation} aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
          <Link href="/contact" onClick={closeNavigation} aria-current={pathname === "/contact" ? "page" : undefined}>Contact</Link>
          <a href={studio.whatsapp} target="_blank" rel="noreferrer" className="mobile-contact">Talk to us on WhatsApp <Icon name="arrow" width="16" height="16" /></a>
        </nav>
        <a className="header-contact" href={studio.whatsapp} target="_blank" rel="noreferrer">
          <Icon name="whatsapp" width="18" height="18" /> Let’s talk
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="Folia home"><Wordmark /></Link>
            <p>Menus, materials, and digital experiences for places that welcome people.</p>
            <span className="footer-location">Designed around your hospitality.</span>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <span className="method-label">Explore</span>
            <Link href="/products">Collections</Link>
            <Link href="/#design-digital">Design &amp; digital</Link>
            <Link href="/about">The studio</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="footer-contacts"><ContactDetails compact /></div>
        </div>
        <div className="footer-end">
          <small>© FOLIA 2026</small>
          <small>Hospitality design &amp; supply · Podgorica, Montenegro</small>
        </div>
      </div>
    </footer>
  );
}
