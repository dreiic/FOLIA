import { studio } from "../lib/content";
import { getMessages } from "../lib/localized-content";
import type { Locale } from "../lib/routing";

export default function Privacy({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const sections = [
    [t.privacyInquiryTitle, t.privacyInquiry],
    [t.privacyServicesTitle, t.privacyServices],
    [t.privacyStorageTitle, t.privacyStorage],
    [t.privacyRetentionTitle, t.privacyRetention],
  ];

  return (
    <article className="shell page-heading privacy-page">
      <h1>{t.privacyTitle}</h1>
      <p>{t.privacyIntro}</p>
      {sections.map(([title, copy]) => (
        <section key={title}>
          <h2>{title}</h2>
          <p>{copy}</p>
        </section>
      ))}
      <section>
        <h2>{t.privacyRightsTitle}</h2>
        <p>{t.privacyRights}</p>
        <a className="text-link" href={`mailto:${studio.email}`}>{studio.email}</a>
      </section>
    </article>
  );
}
