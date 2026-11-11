import { getContent } from "../lib/localized-content";
import type { Locale } from "../lib/routing";
import { ContactDetails } from "../components/contact-details";
import { Eyebrow, Photo } from "../components/editorial";
import { ProjectInquiry } from "../components/project-inquiry";

export default function Contact({ locale }: { locale: Locale }) {
  const { t, editorial, collections, services } = getContent(locale);
  return (
    <>
      <section className="shell contact-page">
        <div className="contact-copy">
          <Eyebrow>{t.contactEyebrow}</Eyebrow>
          <h1>{t.contactFirst}<br /><em>{t.contactSecond}</em></h1>
          <p>{t.contactIntro}</p>
          <ContactDetails t={t} />
        </div>
        <div className="contact-panel">
          <Photo image={editorial.process} className="contact-photo" priority />
          <div className="contact-panel-copy burgundy-panel">
            <Eyebrow>{t.yourProject}</Eyebrow>
            <h2>{t.yourIdea}</h2>
            <ProjectInquiry t={t} collectionTitles={collections.map(({ title }) => title)} menuDesign={services[0].title} websiteDesign={t.websiteDesign} />
          </div>
        </div>
      </section>
    </>
  );
}
