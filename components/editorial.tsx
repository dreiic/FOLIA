import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { emailUrl, whatsappUrl } from "../lib/content";
import { CatalogButton } from "./inquiry-form";
import { Icon } from "./icons";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <Icon name="arrow" width="18" height="18" style={diagonal ? { transform: "rotate(-45deg)" } : undefined} />;
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
      <Image src={image.src} alt={image.alt} fill sizes={sizes}
        fetchPriority={priority ? "high" : "auto"} loading={priority ? "eager" : "lazy"} />
    </div>
  );
}

export function LeadActions({ topic, className = "" }: { topic?: string; className?: string }) {
  const message = topic
    ? `Hello Folia, I’m interested in ${topic.toLowerCase()}. Could you share more about the options for my venue?`
    : "Hello Folia, I’d like to discuss a hospitality project.";
  return (
    <div className={`actions ${className}`}>
      <a href={whatsappUrl(message)} className="button button-primary" target="_blank" rel="noreferrer">
        <Icon name="whatsapp" width="18" height="18" /> Talk on WhatsApp
      </a>
      <a href={emailUrl(topic ? `Folia | ${topic}` : "Folia | Project inquiry", message)} className="text-link">
        Email the studio <Icon name="mail" width="17" height="17" />
      </a>
    </div>
  );
}

export function CatalogCallout() {
  return (
    <section className="catalog-callout">
      <div className="shell catalog-inner">
        <div>
          <Eyebrow>Let’s find the right details.</Eyebrow>
          <h2>Your space.<br />Your way.</h2>
        </div>
        <div className="catalog-copy">
          <p>Tell us about your venue and what you have in mind. We’ll share the catalog, help you explore materials, and put together a proposal around your needs.</p>
          <LeadActions />
          <CatalogButton className="text-link catalog-secondary">Ask for the collection catalog <Arrow /></CatalogButton>
          <Link href="/contact" className="catalog-contact-link">All contact details</Link>
        </div>
      </div>
    </section>
  );
}
