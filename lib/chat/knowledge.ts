import catalogModels from "../catalog-models.json";
import { landingContent } from "../landing-content";
import { getContent } from "../localized-content";
import { portfolioExamples, portfolioGallery } from "../portfolio";
import { localizedPath, type Locale } from "../routing";
import catalogReference from "./catalog-reference.json";

const productNotes = [
  "PDF material families: Crazy Horse and Capri leather, plywood, PU leather, and fabric. Shade ranges include Bordeaux, cognac, black, blue and green in selected leather lines, and oak, walnut, cypress, rosewood and wenge among wood finishes. Color, stock and suitability vary by model and are confirmed by Folia. Screen colours are approximate.",
  "PDF personalization: plain, light, black and colour engraving, blind debossing and gold, silver or copper finishes, plus UV and DTF colour printing. Compatibility depends on substrate and model. Ask whether the guest wants a subtle tone-on-tone impression, metallic accent or full-colour mark. Artwork can be shared with Folia directly for review.",
  "PDF fastening: ring mechanisms (some brass), leather corners, elastic, rope, screws, leather/textile/plywood clamping strips, straps and clips. Ring or clip systems facilitate changes; screw systems secure loose sheets; corner mounts suit a single sheet per panel; elastic can hold folded signatures. Check the model and insert thickness.",
  "Common paper dimensions: A4 210 × 297 mm, A5 148 × 210 mm, US Letter 216 × 279 mm and US Legal 216 × 356 mm (rounded). These are insert dimensions, not outside cover dimensions. Selected models offer square or narrow formats. Ask for width × height, orientation, page count and hole layout before recommending compatibility.",
  "Additional confirmed product examples: selected wooden covers offer a standard or varnished finish, leather strap and screw fastening; selected leather hardcovers offer a rigid HDF core, screw bar and optional protective sleeves. Some QR examples have a clear acrylic panel and oak base, round oak, plywood, or combined QR and NFC. Confirm logo finish and intended URL before production.",
  "Digital menus: distinguish an existing menu URL (physical stands only), a new mobile-friendly menu, and print-ready design. Ask whether the customer already has a link, logo and menu content, and whether the printed and digital versions should match. For NFC, phone compatibility varies. Never promise that a URL can be changed without confirming the chosen setup.",
  "For care, offer general guidance only: avoid soaking or abrasive cleaners and ask Folia to confirm the method for the exact finish. Avoid waterproof, food-safe, sustainable or warranty claims unless Folia explicitly confirms them for the particular product.",
];

export function getChatKnowledge(locale: Locale) {
  const { t, collections, services } = getContent(locale);
  const items: Record<string, string[]> = catalogModels;
  const references: Record<string, string[][]> = catalogReference;

  const portfolio = [...portfolioExamples.slice(0, 1), ...portfolioGallery];
  const links: Record<string, { href: string; label: string }> = {};
  const facts = collections.map(({ id, title, detail, examples, guide }) => {
    links[id] = { href: localizedPath(locale, `/products/${id}`), label: title };
    return { id, title, detail, examples, options: guide.options, brief: guide.brief, models: items[id], pdfModels: references[id] };
  });

  for (const example of portfolio) {
    const id = `example:${example.id}`;
    links[id] = { href: `${localizedPath(locale, "/portfolio")}/#${id}`, label: example.captions[locale][0] };
  }
  const landing = landingContent[locale];
  links.portfolio = { href: localizedPath(locale, "/portfolio"), label: t.portfolio };
  links.catalog = { href: "/catalog/folia-hospitality-catalog.pdf", label: { me: "Folia katalog (PDF)", en: "Folia catalogue (PDF)", ru: "Каталог Folia (PDF)" }[locale] };
  links["menu-design"] = { href: localizedPath(locale, "/services/menu-design"), label: landing.menuDesign.title };
  links["waiter-folders"] = { href: localizedPath(locale, "/products/waiter-folders"), label: landing.waiterFolders.title };
  links.contact = { href: localizedPath(locale, "/contact"), label: t.contact };

  return {
    links,
    text: JSON.stringify({
      facts, productNotes,
      services: services.map(({ title, copy, points }) => ({ title, copy, points })),
      menuDesign: landing.menuDesign,
      waiterFolders: landing.waiterFolders,
      portfolio: portfolio.map(({ id, collection, captions }) => [`example:${id}`, collection, captions[locale][0]]),
      usefulLinkIds: ["portfolio", "catalog", "menu-design", "waiter-folders", "contact"],
    }),
  };
}
