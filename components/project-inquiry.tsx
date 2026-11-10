"use client";

import { useState } from "react";
import { collections, emailUrl, whatsappUrl } from "../lib/content";
import { Icon } from "./icons";

export function ProjectInquiry() {
  const [venue, setVenue] = useState("");
  const [interest, setInterest] = useState("");
  const [note, setNote] = useState("");
  const message = [
    "Hello Folia, I’d like to discuss a project.",
    venue.trim() && `Venue: ${venue.trim()}`,
    interest && `Interested in: ${interest}`,
    note.trim(),
  ].filter(Boolean).join("\n\n");

  return (
    <div className="project-composer" id="inquiry">
      <label htmlFor="venue-name">Your venue <span>optional</span></label>
      <input id="venue-name" autoComplete="organization" maxLength={160} value={venue} onChange={(event) => setVenue(event.target.value)} placeholder="Restaurant, hotel, café…" />
      <label htmlFor="project-interest">What are you looking for?</label>
      <select id="project-interest" value={interest} onChange={(event) => setInterest(event.target.value)}>
        <option value="">Let’s explore the possibilities</option>
        {collections.map(({ id, title }) => <option key={id}>{title}</option>)}
        <option>Menu design &amp; redesign</option>
        <option>Website design</option>
        <option>Full hospitality presentation</option>
      </select>
      <label htmlFor="project-note">A little about your project <span>optional</span></label>
      <textarea id="project-note" value={note} onChange={(event) => setNote(event.target.value)} maxLength={1500} rows={4}
        placeholder="Your idea, the pieces you need, or a menu you’d like to refresh." />
      <div className="actions">
        <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="button button-primary">
          <Icon name="whatsapp" width="18" height="18" /> Continue on WhatsApp
        </a>
        <a href={emailUrl("Folia | Project inquiry", message)} className="text-link">Continue by email <Icon name="mail" width="17" height="17" /></a>
      </div>
      <p className="composer-note">Choose how you’d like to continue the conversation.</p>
    </div>
  );
}
