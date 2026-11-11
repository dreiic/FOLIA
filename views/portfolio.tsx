import Link from "next/link";
import { Arrow, Eyebrow, LeadActions } from "../components/editorial";
import { getContent } from "../lib/localized-content";
import { portfolioExamples, portfolioGallery, portfolioGroups } from "../lib/portfolio";
import { localizedPath, type Locale } from "../lib/routing";

function PortfolioPhoto({ id, alt, priority = false }: { id: string; alt: string; priority?: boolean }) {
  const src = `/portfolio/${id}.webp`;
  return (
    <div className="photo portfolio-photo">
      <picture>
        {id !== "qr-stand" && <source media="(max-width: 760px)" srcSet={`/portfolio/${id}-640.webp`} />}
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />
      </picture>
    </div>
  );
}

export function PortfolioPreview({ locale }: { locale: Locale }) {
  const { t } = getContent(locale);
  const [featured] = portfolioExamples;
  return (
    <section className="home-portfolio" aria-labelledby="home-portfolio-title">
      <div className="shell portfolio-intro">
        <div className="portfolio-copy">
          <Eyebrow>{t.portfolio}</Eyebrow>
          <h2 id="home-portfolio-title">{t.portfolioHeading}</h2>
          <p>{t.portfolioDescription}</p>
          <Link className="text-link" href={localizedPath(locale, "/portfolio")}>{t.portfolioExplore} <Arrow /></Link>
        </div>
        <PortfolioPhoto id={featured.id} alt={featured.captions[locale][2] ?? featured.captions[locale][0]} />
      </div>
    </section>
  );
}

export default function Portfolio({ locale }: { locale: Locale }) {
  const { t, collections } = getContent(locale);
  const [featured] = portfolioExamples;
  const [featuredTitle, , featuredAlt] = featured.captions[locale];

  return (
    <>
      <section className="portfolio-masthead burgundy-panel">
        <div className="shell portfolio-intro">
          <div className="portfolio-copy">
            <Eyebrow>{t.portfolio}</Eyebrow>
            <h1>{t.portfolioHeading}</h1>
            <p>{t.portfolioDescription}</p>
            <a className="text-link" href="#portfolio-gallery">{t.portfolioExplore} <Arrow /></a>
          </div>
          <figure id={`example:${featured.id}`}>
            <PortfolioPhoto id={featured.id} alt={featuredAlt ?? featuredTitle} priority />
            <figcaption><Link href={localizedPath(locale, "/products/product-sets")} className="text-link">{featuredTitle} <Arrow /></Link></figcaption>
          </figure>
        </div>
      </section>
      <section id="portfolio-gallery" className="shell portfolio-gallery" aria-labelledby="portfolio-gallery-title">
        <div className="portfolio-gallery-heading">
          <h2 id="portfolio-gallery-title">{t.portfolioGallery}</h2>
          <nav aria-label={t.portfolioGallery}>
            {portfolioGroups.map(({ id, label }) => <a key={id} className="text-link" href={`#portfolio-${id}`}>{t[label]}</a>)}
          </nav>
        </div>
        {portfolioGroups.map(({ id, label, collections: groupCollections }) => {
          const ids: readonly string[] = groupCollections;
          const examples = portfolioGallery.filter(({ collection }) => ids.includes(collection));
          return (
            <section id={`portfolio-${id}`} key={id} className="portfolio-group" aria-labelledby={`portfolio-${id}-title`}>
              <h3 id={`portfolio-${id}-title`}>{t[label]}</h3>
              <div className="portfolio-grid">
                {examples.map(({ id: photoId, collection, captions }) => {
                  const [title, description, alt] = captions[locale];
                  const category = collections.find((item) => item.id === collection)!;
                  return (
                    <article key={photoId} id={`example:${photoId}`} className="portfolio-entry">
                      <PortfolioPhoto id={photoId} alt={alt ?? title} />
                      <div className="portfolio-caption">
                        <h4>{title}</h4>
                        {description && <p>{description}</p>}
                        <Link className="text-link" href={localizedPath(locale, `/products/${collection}`)}>{category.title} <Arrow /></Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </section>
      <section className="shell portfolio-contact">
        <h2>{t.portfolioContact}</h2>
        <LeadActions locale={locale} topic={t.portfolio} />
      </section>
    </>
  );
}
