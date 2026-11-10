import { studio } from "../lib/content";
import { Icon } from "./icons";

export function ContactDetails({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? "contact-methods is-compact" : "contact-methods"}>
      <li>
        <Icon name="mail" />
        <div><span className="method-label">Office</span><a href={`mailto:${studio.email}`}>{studio.email}</a></div>
      </li>
      <li>
        <Icon name="phone" />
        <div>
          <span className="method-label">Telephone</span>
          <a href={studio.telephone}>{studio.phone}</a>
          <a href={studio.sms} className="method-secondary">Send an SMS <Icon name="message" width="14" height="14" /></a>
        </div>
      </li>
      <li>
        <Icon name="whatsapp" />
        <div><span className="method-label">WhatsApp</span><a href={studio.whatsapp} target="_blank" rel="noreferrer">{studio.phone}</a></div>
      </li>
      <li>
        <Icon name="instagram" />
        <div><span className="method-label">Instagram</span><a href={studio.instagram} target="_blank" rel="noreferrer">@folia.me</a></div>
      </li>
      <li>
        <Icon name="location" />
        <div><span className="method-label">Based in</span><span>{studio.location}</span></div>
      </li>
    </ul>
  );
}
