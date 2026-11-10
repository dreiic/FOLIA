import Link from "next/link";
import { CatalogCallout, Eyebrow, LeadActions, Photo } from "../components/editorial";
import { ParallaxHero } from "../components/parallax-hero";
import { CollectionCard } from "../components/collection-card";
import { CatalogButton } from "../components/inquiry-form";
import { Icon } from "../components/icons";
import { collections, editorial, materials, services, whatsappUrl } from "../lib/content";

export default function Home() {
  const featured = collections.slice(0, 3);

  return (
    <>
      <ParallaxHero />
      <section className="shell hero-introduction" id="hero-introduction">
        <div>
          <Eyebrow>Folia · Hospitality design &amp; supply</Eyebrow>
          <h2>Custom menus.<br /><em>Considered details.</em></h2>
        </div>
        <div className="hero-introduction-copy">
          <p>Menu covers, hospitality essentials, and digital experiences, designed around your restaurant, hotel, or café.</p>
          <div className="actions">
            <Link href="/products" className="button button-primary">Explore the collections <Icon name="arrow" width="18" height="18" /></Link>
            <a href={whatsappUrl("Hello Folia, I’d like to talk about my venue.")} className="text-link" target="_blank" rel="noreferrer">Talk to the studio <Icon name="whatsapp" width="18" height="18" /></a>
          </div>
        </div>
      </section>

      <section className="shell studio-intro">
        <div><Eyebrow>For places that welcome people.</Eyebrow><h2>One identity.<br />Across the whole table.</h2></div>
        <div>
          <p>We help hospitality businesses bring their presentation together. A menu that needs a new layout. A cover that feels right in the hand. The guest folder, the bill presenter, the QR menu.</p>
          <p>We start with your space, listen to what you need, and work through the design, materials, and details with you.</p>
          <Link href="/about" className="text-link">Meet Folia <Icon name="arrow" width="17" height="17" /></Link>
        </div>
      </section>

      <section className="collection-section">
        <div className="shell">
          <div className="section-heading">
            <div><Eyebrow>The collections</Eyebrow><h2>For the everyday<br />moments of hospitality.</h2></div>
            <Link href="/products" className="text-link">Explore all collections <Icon name="arrow" width="17" height="17" /></Link>
          </div>
          <div className="collection-grid">
            {featured.map((collection) => <CollectionCard key={collection.id} collection={collection} />)}
          </div>
          <div className="collection-index-links">
            {collections.slice(4, 9).map(({ id, title }) => <Link key={id} href={`/products/${id}`}>{title} <Icon name="arrow" width="15" height="15" /></Link>)}
          </div>
        </div>
      </section>

      <section className="venue-banner">
        <Photo image={editorial.dining} className="venue-background" sizes="100vw" />
        <div className="shell venue-copy">
          <Eyebrow>It starts with your space.</Eyebrow>
          <h2>A menu should feel<br />like part of the room.</h2>
          <p>The colors, the texture, the way it opens.<br />We help you bring those choices together.</p>
        </div>
      </section>

      <section className="shell design-services" id="design-digital">
        <div className="section-heading services-heading">
          <div><Eyebrow>Design, in print &amp; online</Eyebrow><h2>From a refreshed menu<br />to a complete experience.</h2></div>
          <p>We can redesign what you already have or build a new direction around your venue.</p>
        </div>
        {services.map((service) => (
          <article className={service.id === "qr-menus" ? "service-row service-digital" : "service-row"} key={service.id} id={service.id}>
            <Photo image={service.image} className="service-photo" />
            <div className="service-copy">
              <Eyebrow>{service.id === "qr-menus" ? "QR menus & digital presentation" : service.id === "website-design" ? "Websites for hospitality" : "A fresh look for your menu"}</Eyebrow>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <ul className="service-points">{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <a href={whatsappUrl(`Hello Folia, I’m interested in ${service.inquiry.toLowerCase()}. I’d like to discuss my venue.`)} className="text-link" target="_blank" rel="noreferrer">
                {service.id === "qr-menus" ? "Let’s create your QR menu" : service.id === "website-design" ? "Let’s discuss your website" : "Let’s refresh your menu"} <Icon name="arrow" width="18" height="18" />
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="materials-section">
        <div className="shell materials-inner">
          <div className="materials-copy">
            <Eyebrow>Materials &amp; personalization</Eyebrow>
            <h2>Something you<br />can feel.</h2>
            <p>Supple leather, woven fabric, warm wood. We’ll help you choose the material, color, and logo treatment that belongs in your space.</p>
            <div className="material-tags">{materials.map((material) => <span key={material}>{material}</span>)}</div>
            <CatalogButton className="text-link">Explore the finishes with us <Icon name="arrow" width="18" height="18" /></CatalogButton>
          </div>
          <Photo image={editorial.leather} className="materials-photo" />
        </div>
      </section>

      <section className="shell working-together">
        <Eyebrow>Working together</Eyebrow>
        <div className="working-heading"><h2>Tell us what you need.<br />We’ll take it from there.</h2><LeadActions /></div>
        <ol className="work-steps">
          <li><span>01</span><h3>A conversation.</h3><p>Tell us about your venue, the pieces you need, or the menu you’d like to redesign.</p></li>
          <li><span>02</span><h3>A direction.</h3><p>We share the catalog and work through materials, artwork, and the options that suit your project.</p></li>
          <li><span>03</span><h3>Your presentation.</h3><p>Once the details are agreed, we coordinate the personalized products and digital work for your venue.</p></li>
        </ol>
      </section>
      <CatalogCallout />
    </>
  );
}
