import { whatsappUrl } from "../lib/content";
import { getContent } from "../lib/localized-content";
import { localizedPath, type Locale } from "../lib/routing";
import Link from "next/link";
import { CatalogCallout, Eyebrow, LeadActions, Photo } from "../components/editorial";
import { ParallaxHero } from "../components/parallax-hero";
import { CollectionCard } from "../components/collection-card";
import { CollectionRail } from "../components/collection-rail";
import { CatalogButton } from "../components/inquiry-form";
import { Icon } from "../components/icons";
import { OrganizationData } from "../components/structured-data";
import { menuDesignPath } from "../lib/seo";

export default function Home({ locale }: { locale: Locale }) {
  const { t, collections, editorial, materials, services } = getContent(locale);
  const featured = collections.slice(0, 5);

  return (
    <>
      {locale === "me" && <OrganizationData />}
      <ParallaxHero business={t.business} discover={t.discover} />
      <section className="shell hero-introduction" id="hero-introduction">
        <div>
          <Eyebrow>Folia · {t.business}</Eyebrow>
          <h2>{t.introFirst}<br /><em>{t.introSecond}</em></h2>
        </div>
        <div className="hero-introduction-copy">
          <p>{t.introText}</p>
          <div className="actions">
            <Link href={localizedPath(locale, "/products")} className="button button-primary">{t.exploreCollections} <Icon name="arrow" width="18" height="18" /></Link>
            <a href={whatsappUrl(t.introMessage)} className="text-link" target="_blank" rel="noreferrer">{t.introTalk} <Icon name="whatsapp" width="18" height="18" /></a>
          </div>
        </div>
      </section>

      <section className="home-collections burgundy-panel" aria-labelledby="featured-collections">
        <div className="shell">
          <div className="section-heading scroll-entrance">
            <div>
              <Eyebrow>{t.collections}</Eyebrow>
              <h2 id="featured-collections">{t.featuredFirst}<br /><em>{t.featuredSecond}</em></h2>
            </div>
            <Link href={localizedPath(locale, "/products")} className="text-link">{t.exploreAll} <Icon name="arrow" width="17" height="17" /></Link>
          </div>
          <CollectionRail previousLabel={t.previous} nextLabel={t.next} labelledBy="featured-collections">
            {featured.map((collection) => (
              <li key={collection.id}><CollectionCard locale={locale} collection={collection} sizes="(max-width: 680px) 80vw, 42vw" /></li>
            ))}
          </CollectionRail>
        </div>
      </section>

      <section className="venue-banner">
        <Photo image={editorial.dining} className="venue-background" sizes="100vw" />
        <div className="shell venue-copy">
          <Eyebrow>{t.venueEyebrow}</Eyebrow>
          <h2>{t.venueFirst}<br />{t.venueSecond}</h2>
          <p>{t.venueText}</p>
          <Link href={localizedPath(locale, "/about")} className="text-link">{t.meet} <Icon name="arrow" width="17" height="17" /></Link>
        </div>
      </section>

      <section className="shell design-services" id="design-digital">
        <div className="section-heading services-heading scroll-entrance">
          <div><Eyebrow>{t.servicesEyebrow}</Eyebrow><h2>{t.servicesFirst}<br />{t.servicesSecond}</h2></div>
          <p>{t.servicesText}</p>
        </div>
        {services.map((service) => (
          <article className={service.id === "qr-menus" ? "service-row service-digital burgundy-panel scroll-entrance" : "service-row scroll-entrance"} key={service.id} id={service.id}>
            <Photo image={service.image} className="service-photo" />
            <div className="service-copy">
              <Eyebrow>{service.id === "qr-menus" ? t.qrServiceEyebrow : service.id === "website-design" ? t.webServiceEyebrow : t.menuServiceEyebrow}</Eyebrow>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <ul className="service-points">{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <div className="actions">
                {service.id === "menu-design" && <Link className="text-link" href={localizedPath(locale, menuDesignPath)}>{t.menuDesignDetails} <Icon name="arrow" /></Link>}
                {service.id === "qr-menus" && <Link className="text-link" href={localizedPath(locale, "/products/digital-menus")}>{t.qrMenuDetails} <Icon name="arrow" /></Link>}
                <a href={whatsappUrl(service.message)} className="text-link" target="_blank" rel="noreferrer">
                  {service.id === "qr-menus" ? t.qrServiceLink : service.id === "website-design" ? t.webServiceLink : t.menuServiceLink} <Icon name="arrow" width="18" height="18" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="materials-section">
        <div className="shell materials-inner scroll-entrance">
          <div className="materials-copy">
            <Eyebrow>{t.materialsEyebrow}</Eyebrow>
            <h2>{t.materialsFirst}<br />{t.materialsSecond}</h2>
            <p>{t.materialsText}</p>
            <div className="material-tags">{materials.map((material) => <span key={material}>{material}</span>)}</div>
            <CatalogButton className="text-link">{t.exploreFinishes} <Icon name="arrow" width="18" height="18" /></CatalogButton>
          </div>
          <Photo image={editorial.leather} className="materials-photo" />
        </div>
      </section>

      <section className="shell working-together">
        <Eyebrow>{t.workingEyebrow}</Eyebrow>
        <div className="working-heading"><h2>{t.workingFirst}<br />{t.workingSecond}</h2><LeadActions locale={locale} /></div>
        <ol className="work-steps">
          <li><span>01</span><h3>{t.stepOne}</h3><p>{t.stepOneText}</p></li>
          <li><span>02</span><h3>{t.stepTwo}</h3><p>{t.stepTwoText}</p></li>
          <li><span>03</span><h3>{t.stepThree}</h3><p>{t.stepThreeText}</p></li>
        </ol>
      </section>
      <CatalogCallout locale={locale} />
    </>
  );
}
