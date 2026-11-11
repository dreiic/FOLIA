import { getContent } from "../lib/localized-content";
import type { Locale } from "../lib/routing";
import { CatalogCallout, Eyebrow, LeadActions, Photo } from "../components/editorial";

export default function About({ locale }: { locale: Locale }) {
  const { t, editorial } = getContent(locale);
  return (
    <>
      <section className="shell about-hero">
        <div className="about-title">
          <Eyebrow>{t.aboutEyebrow}</Eyebrow>
          <h1>{t.aboutFirst}<br />{t.aboutSecond}</h1>
          <p>{t.aboutIntro}</p>
        </div>
        <Photo image={editorial.process} className="about-photo" priority sizes="(max-width: 760px) 100vw, 65vw" />
      </section>
      <section className="shell studio-intro">
        <div><Eyebrow>{t.aboutApproach}</Eyebrow><h2>{t.aboutSpaceFirst}<br />{t.aboutSpaceSecond}</h2></div>
        <div>
          <p>{t.aboutProject}</p>
          <p>{t.aboutProcess}</p>
          <LeadActions locale={locale} />
        </div>
      </section>
      <section className="about-setting">
        <Photo image={editorial.dining} className="about-setting-photo" sizes="100vw" />
        <div className="about-setting-note"><Eyebrow>{t.aboutAudience}</Eyebrow><h2>{t.aboutCareFirst}<br />{t.aboutCareSecond}</h2><p>{t.aboutCareText}</p></div>
      </section>
      <CatalogCallout locale={locale} />
    </>
  );
}
