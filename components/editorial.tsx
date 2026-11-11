import { getMessages } from "../lib/localized-content";
import { localizedPath, type Locale } from "../lib/routing";
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

export function LeadActions({ locale, topic, className = "" }: { locale: Locale; topic?: string; className?: string }) {
  const t = getMessages(locale);
  const message = topic ? t.topicMessage.replace("{topic}", () => topic) : t.leadMessage;
  return (
    <div className={`actions ${className}`}>
      <a href={whatsappUrl(message)} className="button button-primary" target="_blank" rel="noreferrer">
        <Icon name="whatsapp" width="18" height="18" /> {t.talkWhatsApp}
      </a>
      <a href={emailUrl(`Folia | ${topic ?? t.projectSubject}`, message)} className="text-link">
        {t.emailStudio} <Icon name="mail" width="17" height="17" />
      </a>
    </div>
  );
}

export function CatalogCallout({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  return (
    <section className="catalog-callout">
      <div className="shell catalog-inner">
        <div>
          <Eyebrow>{t.calloutEyebrow}</Eyebrow>
          <h2>{t.calloutFirst}<br />{t.calloutSecond}</h2>
        </div>
        <div className="catalog-copy">
          <p>{t.calloutText}</p>
          <LeadActions locale={locale} />
          <CatalogButton className="text-link catalog-secondary">{t.requestCatalog} <Arrow /></CatalogButton>
          <Link href={localizedPath(locale, "/contact")} className="catalog-contact-link">{t.allContacts}</Link>
        </div>
      </div>
    </section>
  );
}
