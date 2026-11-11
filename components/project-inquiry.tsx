"use client";

import type { Messages } from "../lib/localized-content";
import { useState } from "react";
import { emailUrl, whatsappUrl } from "../lib/content";
import { Icon } from "./icons";

export function ProjectInquiry({ t, collectionTitles, menuDesign, websiteDesign }: { t: Messages; collectionTitles: string[]; menuDesign: string; websiteDesign: string }) {
  const [venue, setVenue] = useState("");
  const [interest, setInterest] = useState("");
  const [note, setNote] = useState("");
  const message = [
    t.composerGreeting,
    venue.trim() && `${t.composerVenue}: ${venue.trim()}`,
    interest && `${t.composerInterest}: ${interest}`,
    note.trim(),
  ].filter(Boolean).join("\n\n");

  return (
    <div className="project-composer" id="inquiry">
      <label htmlFor="venue-name">{t.venueLabel} <span>{t.optional}</span></label>
      <input id="venue-name" autoComplete="organization" maxLength={160} value={venue} onChange={(event) => setVenue(event.target.value)} placeholder={t.venuePlaceholder} />
      <label htmlFor="project-interest">{t.interestLabel}</label>
      <select id="project-interest" value={interest} onChange={(event) => setInterest(event.target.value)}>
        <option value="">{t.interestEmpty}</option>
        {collectionTitles.map((title) => <option key={title}>{title}</option>)}
        <option>{menuDesign}</option>
        <option>{websiteDesign}</option>
        <option>{t.fullPresentation}</option>
      </select>
      <label htmlFor="project-note">{t.noteLabel} <span>{t.optional}</span></label>
      <textarea id="project-note" value={note} onChange={(event) => setNote(event.target.value)} maxLength={1500} rows={4}
        placeholder={t.notePlaceholder} />
      <div className="actions">
        <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="button button-primary">
          <Icon name="whatsapp" width="18" height="18" /> {t.continueWhatsApp}
        </a>
        <a href={emailUrl(`Folia | ${t.projectSubject}`, message)} className="text-link">{t.continueEmail} <Icon name="mail" width="17" height="17" /></a>
      </div>
      <p className="composer-note">{t.composerNote}</p>
    </div>
  );
}
