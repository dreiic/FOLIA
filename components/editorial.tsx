import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { catalogPath } from "../lib/content";
import { CatalogButton } from "./inquiry-form";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.35">
      {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M3 12h17m-7-7 7 7-7 7" />}
    </svg>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export function Photo({ image, className = "", priority = false, sizes = "(max-width: 760px) 100vw, 50vw" }: {
  image: { src: string; alt: string };
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} fetchPriority={priority ? "high" : "auto"} loading={priority ? "eager" : "lazy"} />
    </div>
  );
}

export function CatalogCallout({ productPage = false }: { productPage?: boolean }) {
  return (
    <section className="catalog-callout">
      <div className="shell catalog-inner">
        <Eyebrow>Discover our collection</Eyebrow>
        <h2>Find the Perfect <em>Finishing Touch.</em></h2>
        <p>Explore our selection of customizable hospitality products, materials, colors, and finishes. Request our catalog to discover what we can create for your space.</p>
        <div className="actions">
          <CatalogButton className="button button-primary">
            {productPage ? "Request Full Catalog" : "Request Our Catalog"} <Arrow diagonal />
          </CatalogButton>
          <a href={catalogPath} className="text-link" download>Download PDF <span aria-hidden="true">↓</span></a>
          <Link href="/contact" className="text-link">Contact Us <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
