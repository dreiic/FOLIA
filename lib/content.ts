export const studio = {
  email: process.env.NEXT_PUBLIC_FOLIA_EMAIL || "office.folia@gmail.com",
  instagram: process.env.NEXT_PUBLIC_FOLIA_INSTAGRAM_URL || "https://www.instagram.com/folia.me/",
  location: "Montenegro",
  whatsapp: "https://wa.me/38269990978",
  phone: "+382 69 990 978",
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const editorial = {
  hero: { src: "/editorial/folia-02.webp", alt: "Oxblood Folia leather menu on a softly lit restaurant table" },
  leather: { src: "/editorial/folia-03.webp", alt: "A curved edge of fine-grained oxblood leather against warm ivory" },
  qr: { src: "/editorial/folia-04.webp", alt: "Oxblood Folia QR menu stand on a marble table" },
  embossed: { src: "/editorial/folia-06.webp", alt: "Blind-debossed Folia lettering on a charcoal bill presenter" },
  stitch: { src: "/editorial/folia-07.webp", alt: "Close-up of the stitching on an oxblood leather cover" },
  process: { src: "/editorial/folia-08.webp", alt: "Hands inspecting the finish of a Folia menu cover" },
  dining: { src: "/editorial/folia-09.webp", alt: "Restaurant tables set with linen and glassware in warm evening light" },
};

type Collection = {
  id: string;
  title: string;
  short: string;
  detail: string;
  examples: string[];
  image?: { src: string; alt: string };
};

export const catalogPath = "/catalog/folia-hospitality-catalog.pdf";

export const collections: Collection[] = [
  {
    id: "menu-covers",
    title: "Menu Covers",
    short: "Customizable menu and wine list covers in leather, fabric, wood, and other materials.",
    detail: "Give guests a first impression of your table. Choose a material, color, and finish to complement the feel of your restaurant, bar, or café.",
    examples: ["Restaurant, cocktail, and wine menus", "Wood, leather, faux leather, fabric, and felt", "Ring binders, screw posts, corner mounts, and elastic bindings"],
    image: editorial.hero,
  },
  {
    id: "hotel-guest-folders",
    title: "Hotel & Guest Folders",
    short: "Guest folders, room directories, and presentation pieces for hospitality spaces.",
    detail: "Make useful information feel like part of the welcome. We help design guest folders and presentation pieces to suit the setting and the material inside.",
    examples: ["Guest information folders", "Room directories", "Reception folders"],
    image: { src: "/editorial/guest-folder.webp", alt: "Illustrative linen guest folder with an ivory insert" },
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
    title: "QR, NFC & Digital Menus",
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
  },
  {
    id: "menu-boards",
    title: "Handheld Menu Boards",
    short: "Clipboard-style menu boards with visible, easy-to-change inserts.",
    detail: "Present a single sheet or a short menu on a wood, leather-faced, or felt-front board.",
    examples: ["Wooden, leather, and felt boards", "Clips, metal rings, and clamp bars", "Corner mounts and elastic bands"],
  },
  {
    id: "wall-menu-boards",
    title: "Wall Menu Boards",
    short: "Changeable menu displays for counters, cafés, and service walls.",
    detail: "Display menus, specials, or a drinks list on oak rails with interchangeable lettering.",
    examples: ["Natural, dark, and oiled oak rails", "Acrylic and HDF letters", "Hanging menu displays"],
  },
  {
    id: "table-service",
    title: "Table & Serving Accessories",
    short: "Serving pieces and tabletop essentials that can be coordinated with your menus.",
    detail: "Build a consistent table setting with presentation and service accessories in materials that suit your space.",
    examples: ["Cutlery cases, napkin holders, and table caddies", "Serving trays, tasting boards, and divided boards", "Placemats, coasters, and tissue boxes"],
  },
  {
    id: "signage",
    title: "Hospitality Signage",
    short: "Room, directional, information, and business signs for hospitality spaces.",
    detail: "Carry your visual identity through guest areas with clear wayfinding, branded plaques, and illuminated signage.",
    examples: ["Room numbers, door hangers, and floor directories", "Directional, restroom, parking, and information signs", "Custom interior signs and lightboxes"],
  },
  {
    id: "menu-inserts",
    title: "Menu Inserts & Add-ons",
    short: "Printed menu sheets and protective sleeves for presentation folders.",
    detail: "Select an insert to suit your menu dimensions, binding, and the way your team updates it.",
    examples: ["Matte and glossy digital printing", "A-series, U.S., and narrow formats", "Hole-punched and center-fold sleeves"],
  },
  {
    id: "product-sets",
    title: "Coordinated Hospitality Sets",
    short: "Matching menu and tabletop pieces for a complete venue concept.",
    detail: "Build a coordinated set around your space, from cafés and cocktail bars to steakhouses, pubs, pizzerias, and lodges.",
    examples: ["Dining room and lodge sets", "Coffee, pizzeria, pub, and steakhouse sets", "Cocktail bar sets"],
  },
  {
    id: "samples",
    title: "Material Samples",
    short: "Sample folders and swatches for comparing materials and finishes.",
    detail: "Explore colors and textures in person before choosing the finish for your project.",
    examples: ["Wood, fabric, genuine leather, and faux leather sample boxes", "Mixed-material sample sets", "Finish swatches"],
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
  "General Inquiry",
];
