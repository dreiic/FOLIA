import { collections } from "./content";
import { locales, localizedPath, type Locale } from "./routing";

export const siteOrigin = "https://foliadesign.me";

export const menuDesignPath = "/services/menu-design";
export const waiterFoldersPath = "/products/waiter-folders";
export const landingKinds = {
  [menuDesignPath]: "menuDesign",
  [waiterFoldersPath]: "waiterFolders",
} as const;

export const sitePagePaths = [
  "/", "/products", "/portfolio", "/about", "/contact", "/privacy", menuDesignPath, waiterFoldersPath,
  ...collections.map(({ id }) => `/products/${id}`),
];

export function pageUrl(locale: Locale, path: string) {
  const localized = localizedPath(locale, path);
  return new URL(localized === "/" ? localized : `${localized}/`, siteOrigin).href;
}

export function alternatePageUrls(path: string) {
  const languages = { me: "sr-ME", en: "en", ru: "ru" };
  return {
    ...Object.fromEntries(locales.map(({ id }) => [languages[id], pageUrl(id, path)])),
    "x-default": pageUrl("me", path),
  };
}

export const montenegroSearchCopy: Record<string, [string, string]> = {
  "/": [
    "Jelovnici i oprema za ugostiteljstvo u Crnoj Gori",
    "Folia iz Podgorice izrađuje jelovnike po narudžbi, korice sa logotipom i QR menije za restorane, hotele i kafiće širom Crne Gore.",
  ],
  "/products": [
    "Oprema za restorane, hotele i kafiće u Crnoj Gori",
    "Pogledajte korice za jelovnike, konobarske foldere, hotelske mape, stalke za QR menije i drugu ugostiteljsku opremu po mjeri.",
  ],
  "/products/menu-covers": [
    "Korice za jelovnike po mjeri u Crnoj Gori",
    "Odaberite format, materijal, način umetanja stranica i utiskivanje logotipa za korice jelovnika ili vinske karte.",
  ],
  "/products/digital-menus": [
    "QR meni za restorane i kafiće u Crnoj Gori",
    "Izrada QR menija za ugostitelje. Gosti skeniraju kod i otvaraju digitalni jelovnik u pregledaču, a ponudu možete ažurirati.",
  ],
  "/products/hotel-guest-folders": [
    "Hotelske mape i fascikle za goste",
    "Mape za hotelske sobe i recepcije za informacije o boravku, uslugama i ponudi hotela. Birajte format, materijal i detalje s logotipom.",
  ],
  "/products/restaurant-accessories": [
    "Restoranski dodaci, mape za račun i oznake za stolove",
    "Mape za račune, konobarski blokovi i oznake za rezervisane stolove za restorane, hotele i kafiće. Uskladite materijal i izgled s jelovnikom.",
  ],
  "/products/menu-holders": [
    "Stalci za jelovnike i stoni displeji",
    "Drveni i akrilni stalci za jelovnike, dnevnu ponudu i promocije. Pogledajte dvostrane, magnetne i druge modele za stolove i šank.",
  ],
  "/products/menu-boards": [
    "Daske za jelovnike i vinske karte",
    "Daske za menije s držačima za papir, u formatima za jelovnike, vinske karte i dnevnu ponudu. Pogledajte materijale i načine pričvršćivanja.",
  ],
  "/products/wall-menu-boards": [
    "Zidne table za menije i cjenovnike",
    "Zidni meniji za kafiće, barove i lokale s ponudom iznad šanka. Odaberite raspored i sistem prema tome koliko često mijenjate ponudu.",
  ],
  "/products/menu-inserts": [
    "Umetci i zaštitne folije za jelovnike",
    "Unutrašnje stranice i zaštitne folije za jelovnike i vinske karte. Uskladite dimenzije i način pričvršćivanja s postojećim koricama.",
  ],
  "/products/table-service": [
    "Podmetači i daske za posluživanje",
    "Oprema za posluživanje i postavku stola u restoranima i hotelima, uključujući podmetače, daske i dodatke koje možete uskladiti.",
  ],
  "/products/signage": [
    "Oznake za hotele, restorane i kafiće",
    "Brojevi za hotelske sobe, putokazi i oznake za prostor. Birajte format, način postavljanja i izgled prema enterijeru.",
  ],
  "/products/product-sets": [
    "Usklađeni setovi za restorane i hotele",
    "Kombinujte korice za jelovnike, mape za račun, stalke i druge detalje u istom materijalu ili završnoj obradi.",
  ],
  "/products/samples": [
    "Uzorci materijala za korice i ugostiteljsku opremu",
    "Pogledajte uzorke kože, tekstila, filca i drveta prije izbora materijala za jelovnike, mape i dodatke za sto.",
  ],
};
