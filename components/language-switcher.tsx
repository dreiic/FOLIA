"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { locales, localizedPath, type Locale } from "../lib/routing";
import { Icon } from "./icons";

function Flag({ locale }: { locale: Locale }) {
  return <Image className="language-flag" src={`/flags/${locale}.png`} alt="" width={22} height={15} unoptimized />;
}

export function LanguageSwitcher({ locale, path, label, onSelect }: { locale: Locale; path: string; label: string; onSelect: () => void }) {
  const panelId = useId();
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [suffix, setSuffix] = useState("");
  const active = locales.find(({ id }) => id === locale)!;

  useEffect(() => {
    if (!open) return;

    function dismissOutside(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }

    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    }

    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, [open]);

  return (
    <div className="language-switcher" ref={container} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button ref={trigger} className="language-trigger" type="button" aria-label={`${label}: ${active.label}`}
        aria-expanded={open} aria-controls={panelId} onClick={() => {
          setSuffix(window.location.search + window.location.hash);
          setOpen(!open);
        }}>
        <Flag locale={locale} />
        <span aria-hidden="true">{active.short}</span>
        <Icon name="chevron" width="12" height="12" className="language-chevron" />
      </button>
      <nav id={panelId} className="language-panel" aria-label={label} hidden={!open}>
        {locales.map(({ id, lang, label: name }) => (
          <Link key={id} href={localizedPath(id, path) + suffix} prefetch={false}
            aria-current={id === locale ? "page" : undefined} hrefLang={lang} lang={lang}
            onNavigate={() => {
              setOpen(false);
              trigger.current?.focus({ preventScroll: true });
              onSelect();
            }}>
            <Flag locale={id} />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
