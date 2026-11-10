export const studio = {
  email: process.env.NEXT_PUBLIC_FOLIA_EMAIL || "office.folia@gmail.com",
  instagram: process.env.NEXT_PUBLIC_FOLIA_INSTAGRAM_URL || "https://www.instagram.com/folia.me/",
  location: "Podgorica, Montenegro",
  whatsapp: "https://wa.me/38269990978",
  phone: "+382 69 990 978",
  telephone: "tel:+38269990978",
  sms: "sms:+38269990978",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const editorial = {
  hero: { src: "/photography/hero.webp", alt: "A Folia menu and bill presenter on a walnut restaurant table" },
  leather: { src: "/photography/samples.webp", alt: "Leather, woven fabric, felt, and wood samples" },
  qr: { src: "/photography/digital-menus.webp", alt: "A branded digital menu on a phone beside a burgundy QR stand" },
  embossed: { src: "/photography/restaurant-accessories.webp", alt: "A bill presenter, server notebook, and reserved table sign" },
  stitch: { src: "/photography/samples.webp", alt: "A selection of leather and fabric finishes" },
  process: { src: "/photography/design-process.webp", alt: "Reviewing menu layouts and material samples" },
  dining: { src: "/photography/hospitality-background.webp", alt: "A restaurant interior with walnut tables and burgundy seating" },
  website: { src: "/photography/web-design.webp", alt: "A hospitality website displayed on a laptop and phone" },
};

export type Collection = {
  id: string;
  title: string;
  short: string;
  detail: string;
  examples: string[];
  image: { src: string; alt: string };
};

export const catalogPath = "/catalog/folia-hospitality-catalog.pdf";

export const collections: Collection[] = [
  {
    id: "menu-covers",
    title: "Menu Covers",
    short: "Customizable menu and wine list covers in leather, fabric, wood, and other materials.",
    detail: "Give guests a first impression of your table. Choose a material, color, and finish to complement the feel of your restaurant, bar, or café.",
    examples: ["Restaurant, cocktail, and wine menus", "Wood, leather, faux leather, fabric, and felt", "Ring binders, screw posts, corner mounts, and elastic bindings"],
    image: { src: "/photography/menu-covers.webp", alt: "Burgundy leather and woven linen menu covers" },
  },
  {
    id: "hotel-guest-folders",
    title: "Hotel & Guest Folders",
    short: "Guest folders, room directories, and presentation pieces for hospitality spaces.",
    detail: "Make useful information feel like part of the welcome. We help design guest folders and presentation pieces to suit the setting and the material inside.",
    examples: ["Guest information folders", "Room directories", "Reception folders"],
    image: { src: "/photography/hotel-guest-folders.webp", alt: "An open guest information folder in a boutique hotel" },
  },
  {
    id: "restaurant-accessories",
    title: "Restaurant Accessories",
    short: "Bill presenters and complementary branded details that bring the table together.",
    detail: "Carry the same design language from the first menu to the final bill, with accessories that echo your colors, textures, and branding.",
    examples: ["Wooden, leather, and felt bill presenters", "Server books and staff notebooks", "Reserved table signs"],
    image: editorial.embossed,
  },
  {
    id: "digital-menus",
    title: "QR & Digital Menus",
    short: "Branded digital menus and QR or NFC stands in acrylic, plywood, and solid wood.",
    detail: "Give guests a clear, easy-to-read menu on their phone. We design branded digital layouts and can help pair them with a QR stand that suits the table.",
    examples: ["Branded digital layouts", "Acrylic, plywood, and wood QR stands", "Tap-to-open NFC stands"],
    image: editorial.qr,
  },
  {
    id: "menu-holders",
    title: "Menu Holders & Table Displays",
    short: "Freestanding displays for specials, drinks, promotions, and table information.",
    detail: "Choose tabletop display formats in wood or acrylic, with options for upright inserts, magnets, rings, and clips.",
    examples: ["Wooden and clear acrylic table stands", "Magnetic stands", "Table tents, table talkers, and sign holders"],
    image: { src: "/photography/menu-holders.webp", alt: "Acrylic and wooden tabletop menu holders" },
  },
  {
    id: "menu-boards",
    title: "Handheld Menu Boards",
    short: "Clipboard-style menu boards with visible, easy-to-change inserts.",
    detail: "Present a single sheet or a short menu on a wood, leather-faced, or felt-front board.",
    examples: ["Wooden, leather, and felt boards", "Clips, metal rings, and clamp bars", "Corner mounts and elastic bands"],
    image: { src: "/photography/menu-boards.webp", alt: "Walnut and leather-faced handheld menu boards" },
  },
  {
    id: "wall-menu-boards",
    title: "Wall Menu Boards",
    short: "Changeable menu displays for counters, cafés, and service walls.",
    detail: "Display menus, specials, or a drinks list on oak rails with interchangeable lettering.",
    examples: ["Natural, dark, and oiled oak rails", "Acrylic and HDF letters", "Hanging menu displays"],
    image: { src: "/photography/wall-menu-boards.webp", alt: "An oak rail wall menu in a café" },
  },
  {
    id: "table-service",
    title: "Table & Serving Accessories",
    short: "Serving pieces and tabletop essentials that can be coordinated with your menus.",
    detail: "Build a consistent table setting with presentation and service accessories in materials that suit your space.",
    examples: ["Cutlery cases, napkin holders, and table caddies", "Serving trays, tasting boards, and divided boards", "Placemats, coasters, and tissue boxes"],
    image: { src: "/photography/table-service.webp", alt: "Coordinated serving boards, placemats, and tabletop accessories" },
  },
  {
    id: "signage",
    title: "Hospitality Signage",
    short: "Room, directional, information, and business signs for hospitality spaces.",
    detail: "Carry your visual identity through guest areas with clear wayfinding, branded plaques, and illuminated signage.",
    examples: ["Room numbers, door hangers, and floor directories", "Directional, restroom, parking, and information signs", "Custom interior signs and lightboxes"],
    image: { src: "/photography/signage.webp", alt: "Burgundy room and directional signs beside an oak hotel door" },
  },
  {
    id: "menu-inserts",
    title: "Menu Inserts & Add-ons",
    short: "Printed menu sheets and protective sleeves for presentation folders.",
    detail: "Select an insert to suit your menu dimensions, binding, and the way your team updates it.",
    examples: ["Matte and glossy digital printing", "A-series, U.S., and narrow formats", "Hole-punched and center-fold sleeves"],
    image: { src: "/photography/menu-inserts.webp", alt: "Ivory menu inserts and protective sleeves beside a folder" },
  },
  {
    id: "product-sets",
    title: "Coordinated Hospitality Sets",
    short: "Matching menu and tabletop pieces for a complete venue concept.",
    detail: "Build a coordinated set around your space, from cafés and cocktail bars to steakhouses, pubs, pizzerias, and lodges.",
    examples: ["Dining room and lodge sets", "Coffee, pizzeria, pub, and steakhouse sets", "Cocktail bar sets"],
    image: { src: "/photography/product-sets.webp", alt: "A coordinated burgundy hospitality presentation set" },
  },
  {
    id: "samples",
    title: "Material Samples",
    short: "Sample folders and swatches for comparing materials and finishes.",
    detail: "Explore colors and textures in person before choosing the finish for your project.",
    examples: ["Wood, fabric, genuine leather, and faux leather sample boxes", "Mixed-material sample sets", "Finish swatches"],
    image: { src: "/photography/samples.webp", alt: "Leather, linen, felt, and wood material samples" },
  },
];

export const materials = ["Genuine Leather", "Vegan Leather", "Premium Fabrics", "Wood", "Custom Finishes"];

export const processSteps = [
  { title: "Explore", copy: "Browse our collections and discover available materials and customization options." },
  { title: "Enquire", copy: "Tell us about your business, preferred products, and requirements." },
  { title: "Personalize", copy: "We work with you to define the design, materials, finishes, and quantities." },
  { title: "Deliver", copy: "Our production partners make your customized products and prepare them for delivery." },
];

export const inquiryTypes = [
  "Request Product Catalog",
  "Product Inquiry",
  "Custom Project",
  "Digital QR Menu",
  "Menu Redesign",
  "Website Design",
  "General Inquiry",
];


export function whatsappUrl(message: string) {
  return `${studio.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(subject: string, body = "") {
  return `mailto:${studio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const services = [
  {
    id: "menu-design",
    inquiry: "Menu design and redesign",
    number: "01",
    title: "Menu design & redesign",
    copy: "A new layout, a refreshed identity, or a complete rethink of your existing menu. We work around your food, your space, and the way you serve.",
    points: ["Menu layout & typography", "Print-ready artwork", "Brand colors & logo finishes"],
    image: editorial.process,
  },
  {
    id: "qr-menus",
    inquiry: "QR menu design",
    number: "02",
    title: "Your menu, on every phone.",
    copy: "Custom QR menus with your own branding, clear categories, and a layout made for reading at the table. We can pair the digital menu with a matching QR stand.",
    points: ["Branded QR menu design", "Mobile-first presentation", "Matching QR & NFC stands"],
    image: editorial.qr,
  },
  {
    id: "website-design",
    inquiry: "Website design",
    number: "03",
    title: "A website for your hospitality.",
    copy: "A considered online home for your restaurant, hotel, bar, or café. We bring your story, menu, photography, and contact details together in one clear experience.",
    points: ["Website design & development", "Responsive layouts", "Menus, location & contact"],
    image: editorial.website,
  },
];

export const collectionFinishes: Record<string, string[]> = {
  "menu-covers": ["Genuine leather", "Faux leather", "Woven fabric", "Wood & felt"],
  "hotel-guest-folders": ["Leather & fabric", "Interior pockets", "Logo finishes", "Custom layouts"],
  "restaurant-accessories": ["Leather", "Wood", "Felt", "Embossing & engraving"],
  "digital-menus": ["Wood", "Plywood", "Acrylic", "QR & NFC"],
  "menu-holders": ["Clear acrylic", "Wooden bases", "Magnets", "Clips & rings"],
  "menu-boards": ["Wood", "Leather-faced boards", "Felt", "Metal fastenings"],
  "wall-menu-boards": ["Oak rails", "Acrylic letters", "HDF letters", "Wood finishes"],
  "table-service": ["Wood", "Leather", "Fabric", "Custom engraving"],
  "signage": ["Wood & acrylic", "Room numbering", "Engraving & printing", "Lightbox options"],
  "menu-inserts": ["Matte paper", "Glossy paper", "Protective sleeves", "Digital printing"],
  "product-sets": ["Coordinated colors", "Matching materials", "Logo finishes", "Venue-specific sets"],
  "samples": ["Leather", "Faux leather", "Fabric & felt", "Wood finishes"],
};
