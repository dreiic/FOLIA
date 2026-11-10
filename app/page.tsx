import Link from "next/link";
import { Arrow, CatalogCallout, Eyebrow, Photo } from "../components/editorial";
import { CatalogButton } from "../components/inquiry-form";
import { collections, editorial, materials, processSteps } from "../lib/content";

export default function Home() {
  return (
    <>
      <section className="shell hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <Eyebrow>Folia <span className="eyebrow-dot" /> Hospitality design &amp; supply</Eyebrow>
          <h1 id="hero-title">Details That<br />Define <em>Hospitality.</em></h1>
          <p className="hero-lede">Thoughtfully designed menus and hospitality essentials, created to complement the spaces they belong to.</p>
          <div className="actions hero-actions">
            <Link className="button button-primary" href="/products">Explore Our Products <Arrow /></Link>
            <CatalogButton className="text-link">Request a Catalog <Arrow diagonal /></CatalogButton>
          </div>
        </div>
        <figure className="hero-figure">
          <Photo image={editorial.hero} className="hero-image" priority />
          <figcaption className="image-caption"><span>Fig. 01 <span className="caption-dash" /> The Menu Cover</span><span>FOLIA / 01</span></figcaption>
        </figure>
      </section>

      <section className="shell approach">
        <div>
          <Eyebrow>01 / The Folia approach</Eyebrow>
          <h2>Considered in<br /><em>Every Detail.</em></h2>
        </div>
        <div className="approach-copy">
          <p>At FOLIA, we believe that thoughtful presentation is an essential part of the hospitality experience. From carefully selected materials to personalized finishes, we help hospitality businesses create lasting impressions through beautifully designed everyday essentials.</p>
          <Link className="text-link" href="/about">About the Studio <Arrow /></Link>
        </div>
      </section>

      <section className="collection-band">
        <div className="shell">
          <div className="section-heading">
            <div><Eyebrow>02 / The collections</Eyebrow><h2>Made for <em>the Details.</em></h2></div>
            <p>A curated selection of presentation essentials for modern hospitality.</p>
          </div>
          <div className="collection-grid">
            {collections.filter((collection) => collection.image).map((collection, index) => (
              <article className="collection-card" key={collection.id}>
                <Link href={`/products#${collection.id}`} className="collection-image-link" aria-label={`Explore ${collection.title}`}>
                  {collection.image && <Photo image={collection.image} className="collection-image" />}
                </Link>
                <div className="collection-caption">
                  <span className="eyebrow collection-number">0{index + 1}</span>
                  <div><h3>{collection.title}</h3><p>{collection.short}</p></div>
                  <Link href={`/products#${collection.id}`} className="text-link" aria-label={`Explore ${collection.title}`}>Explore <Arrow diagonal /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="actions"><Link href="/products" className="button button-outline">View All Collections <Arrow /></Link></div>
        </div>
      </section>

      <section className="shell split-section materials">
        <figure>
          <Photo image={editorial.stitch} className="square-photo" />
          <figcaption className="image-caption"><span>Fig. 02 <span className="caption-dash" /> Leather &amp; stitching</span></figcaption>
        </figure>
        <div className="split-copy">
          <Eyebrow>03 / Materials &amp; finishes</Eyebrow>
          <h2>Your Identity,<br /><em>in Every Detail.</em></h2>
          <p>From material and color to texture and finishing touches, each piece can be tailored to reflect the character of your brand.</p>
          <ul className="material-list">{materials.map((material) => <li key={material}>{material}</li>)}</ul>
          <CatalogButton className="text-link">Discover the Possibilities <Arrow diagonal /></CatalogButton>
        </div>
      </section>

      <section className="statement">
        <Photo image={editorial.dining} className="statement-photo" sizes="100vw" />
        <div className="shell statement-copy">
          <Eyebrow>For every table</Eyebrow>
          <h2>Beautifully Presented.<br /><em>Thoughtfully Made.</em></h2>
        </div>
      </section>

      <section className="shell split-section digital">
        <div className="split-copy">
          <Eyebrow>04 / Digital menus</Eyebrow>
          <h2>Hospitality,<br /><em>Beyond Print.</em></h2>
          <p>Extend your brand experience with elegant digital menus, designed to make exploring your offering effortless.</p>
          <Link className="text-link" href="/products#digital-menus">Explore Digital Solutions <Arrow /></Link>
        </div>
        <div className="digital-visual">
          <Photo image={editorial.qr} className="digital-photo" />
          <div className="phone" role="img" aria-label="Illustrative digital restaurant menu on a phone">
            <div aria-hidden="true">
              <span className="phone-notch" />
              <span className="phone-kicker">The dining room</span>
              <strong>The Menu</strong>
              <span className="phone-rule" />
              <small>To begin</small><span>Marinated olives</span><span>Burrata &amp; tomato</span>
              <small>From the kitchen</small><span>Wild mushroom risotto</span><span>Roasted sea bass</span>
            </div>
          </div>
        </div>
      </section>

      <section className="shell process">
        <Eyebrow>05 / How we work</Eyebrow>
        <h2>From Vision <em>to Detail.</em></h2>
        <ol className="step-grid">
          {processSteps.map((step, index) => (
            <li key={step.title}><span className="eyebrow">0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></li>
          ))}
        </ol>
      </section>

      <CatalogCallout />
    </>
  );
}
