import type { Locale } from "./routing";

type Caption = [title: string, description?: string, alt?: string];

type Example = {
  id: string;
  collection: string;
  captions: Record<Locale, Caption>;
};

export const portfolioExamples: Example[] = [
  {
    id: "restaurant-set",
    collection: "product-sets",
    captions: {
      me: ["Usklađeni set za restoran", "Isti motiv povezuje drvene jelovnike, mapu za račun i dodatke za sto.", "Drveni jelovnici i stoni dodaci s ugraviranim motivom jelena"],
      en: ["Coordinated restaurant set", "A single motif ties together wooden menus, a bill presenter and table accessories.", "Wooden menus and table accessories engraved with a deer motif"],
      ru: ["Комплект для ресторана", "Один мотив объединяет деревянные меню, папку для счёта и настольные аксессуары.", "Деревянные меню и настольные аксессуары с гравировкой в виде оленя"],
    },
  },
  {
    id: "leather-menu-boards",
    collection: "menu-boards",
    captions: {
      me: ["Bordo daske za jelovnike", "Kožna obloga i utisnuti naziv daju dubinu ravnoj površini jelovnika.", "Bordo daske s utisnutim nazivom restorana"],
      en: ["Burgundy menu boards", "Leather facing and a blind-embossed name give the boards a tactile finish.", "Burgundy menu boards with a restaurant name pressed into the leather"],
      ru: ["Бордовые планшеты для меню", "Кожаная облицовка и тиснение подчёркивают фактуру планшета.", "Бордовые планшеты с тиснением названия ресторана"],
    },
  },
  {
    id: "wooden-menu-boards",
    collection: "menu-boards",
    captions: {
      me: ["Drvene daske s prstenovima", "Tamno bajcovano drvo i metalni prstenovi za umetke koji se mijenjaju.", "Drvene daske za jelovnike s gravurom i metalnim prstenovima"],
      en: ["Wooden ring-bound boards", "Walnut-stained wood pairs with a ring mechanism for replaceable inserts.", "Engraved wooden menu boards with metal binding rings"],
      ru: ["Деревянные планшеты на кольцах", "Дерево тонировано под орех. Кольца позволяют менять вкладыши.", "Деревянные планшеты с гравировкой и металлическими кольцами"],
    },
  },
  {
    id: "qr-stand",
    collection: "digital-menus",
    captions: {
      me: ["Drveni stalak za QR meni", "Ugravirani kod i znak lokala na stalku koji stoji uz gosta na šanku.", "Drveni QR stalak na šanku restorana pod toplim svjetlom"],
      en: ["Wooden QR menu stand", "An engraved code and venue mark sit within reach at the bar.", "Wooden QR stand on a warmly lit restaurant bar"],
      ru: ["Деревянная подставка для QR-меню", "Код и знак заведения выгравированы на подставке у барной стойки.", "Деревянная подставка с QR-кодом на барной стойке"],
    },
  },
  {
    id: "bill-presenters",
    collection: "restaurant-accessories",
    captions: {
      me: ["Mape za račun s bakarnim otiskom", "Bakarnim otiskom istaknut je znak restorana na tamnoj koži.", "Crne kožne mape za račun uz tanjir i pribor"],
      en: ["Bill presenters with copper detailing", "A copper-toned mark stands out against dark leather.", "Black leather bill presenters beside a plate and cutlery"],
      ru: ["Папки для счёта с медным тиснением", "Медный оттиск выделяет знак ресторана на тёмной коже.", "Чёрные кожаные папки для счёта рядом с тарелкой и приборами"],
    },
  },
  {
    id: "reserved-signs",
    collection: "restaurant-accessories",
    captions: {
      me: ["Drvene oznake za rezervaciju", "Samostojeća oznaka spaja čitljiv natpis, gravuru i metalne detalje.", "Drvene oznake s natpisom Reserved i metalnim zakovicama"],
      en: ["Wooden reserved signs", "A freestanding design pairs clear lettering with engraving and metal studs.", "Wooden Reserved signs finished with metal studs"],
      ru: ["Деревянные таблички для резерва", "Устойчивые настольные таблички с читаемой надписью и металлическими заклёпками.", "Деревянные таблички Reserved с металлическими заклёпками"],
    },
  },
  {
    id: "leather-menu-folders",
    collection: "menu-covers",
    captions: {
      me: ["Kožne korice u dvije boje", "Zelena i tamnoplava odvajaju jelovnike, a zajednički format ih povezuje.", "Zelene i tamnoplave kožne korice složene na svijetloj podlozi"],
      en: ["Leather covers in two colours", "Green and navy distinguish menus while a shared format keeps them cohesive.", "Green and navy leather covers arranged on a light surface"],
      ru: ["Кожаные обложки двух цветов", "Зелёный и тёмно-синий различают меню, а общий формат объединяет их.", "Зелёные и тёмно-синие кожаные обложки на светлой поверхности"],
    },
  },
  {
    id: "debossed-menus",
    collection: "menu-covers",
    captions: {
      me: ["Oker korice s utisnutim znakom", "Utisnut znak bez folije prati boju i teksturu korica.", "Oker korice jelovnika s utisnutim nazivom"],
      en: ["Ochre covers with blind embossing", "A foil-free impression lets the colour and texture of the cover show through.", "Ochre menu covers with a name pressed into the surface"],
      ru: ["Обложки цвета охры с тиснением", "Бесцветное тиснение сохраняет оттенок и фактуру материала.", "Обложки для меню цвета охры с тиснёным названием"],
    },
  },
  {
    id: "wooden-table-set",
    collection: "product-sets",
    captions: {
      me: ["Drveni set za postavku stola", "Jelovnici i dodaci za posluživanje u tamnom drvetu i usklađenoj završnoj obradi.", "Usklađeni drveni jelovnici i dodaci na restoranskom stolu"],
      en: ["Wooden tabletop collection", "Dark wood and a shared finish bring menus and service pieces together.", "Matching wooden menus and service pieces on a restaurant table"],
      ru: ["Деревянный комплект для сервировки", "Меню и аксессуары для сервировки объединены тёмным деревом и общей отделкой.", "Деревянные меню и аксессуары на ресторанном столе"],
    },
  },
];

type AdditionalExample = [number, string, string, string, string];

const additionalExamples: AdditionalExample[] = [
  [1, "menu-covers", "Smeđe korice s dvojezičnim otiskom", "Brown covers with bilingual embossing", "Коричневые обложки с тиснением на двух языках"],
  [2, "menu-covers", "Korice sa šrafovima i letvicom", "Covers with screw-and-bar binding", "Обложки с винтами и прижимной планкой"],
  [7, "menu-covers", "Drvene korice s kožnim pregibom", "Wooden covers with a leather hinge", "Деревянные обложки с кожаным корешком"],
  [9, "product-sets", "Kožni jelovnici i drvena mapa za račun", "Leather menus with a wooden bill presenter", "Кожаные меню и деревянная папка для счёта"],
  [12, "menu-covers", "Kožne korice s dubokim utiskivanjem", "Leather covers with deep embossing", "Кожаные обложки с глубоким тиснением"],
  [13, "product-sets", "Uparena daska za jelovnik i mapa za račun", "Matching menu board and bill presenter", "Планшет для меню и папка для счёта в одном стиле"],
  [14, "restaurant-accessories", "Drvene mape za račun s gravurom", "Engraved wooden bill presenters", "Деревянные папки для счёта с гравировкой"],
  [15, "wall-menu-boards", "Zidni meni sa šinama", "Wall menu with mounting rails", "Настенное меню на рейках"],
  [16, "menu-covers", "Kožne korice za kartu pića", "Leather drinks menu covers", "Кожаные обложки для карты напитков"],
  [17, "menu-covers", "Korice s otiskom u više boja", "Branded covers in several colours", "Обложки разных цветов с фирменным знаком"],
  [18, "menu-covers", "Korice za barske menije", "Bar menu covers", "Обложки для барного меню"],
  [19, "menu-covers", "Drvene korice sa zelenom gravurom", "Wooden covers with green engraving", "Деревянные обложки с зелёной гравировкой"],
  [20, "menu-holders", "Drveni držač u boji mahagonija", "Mahogany-toned wooden menu holder", "Деревянный держатель цвета махагона"],
  [21, "menu-covers", "Kožne korice s izraženim reljefom", "Leather covers with pronounced embossing", "Кожаные обложки с выразительным тиснением"],
  [22, "product-sets", "Set od kože za steakhouse", "Leather steakhouse set", "Кожаный комплект для стейк-хауса"],
  [23, "product-sets", "Usklađeni set za pivnicu", "Coordinated pub set", "Комплект для паба"],
  [24, "product-sets", "Komplet jelovnika i dodataka za piceriju", "Menu and accessories set for a pizzeria", "Комплект меню и аксессуаров для пиццерии"],
  [27, "restaurant-accessories", "Oznaka za rezervaciju s logotipom", "Reserved sign with a venue logo", "Табличка для резерва с логотипом"],
  [28, "product-sets", "Personalizovani set za bar", "Branded bar accessories set", "Фирменный комплект аксессуаров для бара"],
  [29, "product-sets", "Kožne korice i restoranski dodaci", "Leather covers and restaurant accessories", "Кожаные обложки и аксессуары для ресторана"],
  [30, "menu-covers", "Drvene korice i štampani umetci", "Wooden covers with printed inserts", "Деревянные обложки с печатными вкладышами"],
  [31, "restaurant-accessories", "Kožne mape za račun s dva džepa", "Two-pocket leather bill presenters", "Кожаные папки для счёта с двумя карманами"],
  [32, "menu-covers", "Kožne korice s mesinganim prstenovima", "Leather covers with brass rings", "Кожаные обложки с латунными кольцами"],
  [33, "menu-boards", "Daske za meni i kožni držači", "Menu boards and leather holders", "Планшеты для меню и кожаные держатели"],
  [34, "restaurant-accessories", "Stona oznaka za rezervaciju", "Tabletop reserved sign", "Настольная табличка для резерва"],
  [36, "menu-covers", "Trostruko preklopne kožne korice", "Trifold leather menu covers", "Трёхстворчатые кожаные обложки"],
  [37, "menu-covers", "Izdužene kožne korice", "Tall-format leather covers", "Кожаные обложки удлинённого формата"],
  [38, "menu-covers", "Kompaktne korice za jelovnike", "Compact menu covers", "Компактные обложки для меню"],
  [39, "menu-covers", "Lakirane drvene korice s gravurom", "Varnished wooden covers with engraving", "Лакированные деревянные обложки с гравировкой"],
  [40, "menu-holders", "Personalizovani držači za jelovnike", "Custom menu holders", "Держатели для меню на заказ"],
  [41, "menu-boards", "Preklopne korice i daska s kožnom oblogom", "Trifold cover and leather-faced board", "Трёхстворчатая обложка и планшет с кожаной облицовкой"],
  [42, "product-sets", "Drvene korice i mape za račun", "Wooden menu covers and bill presenters", "Деревянные обложки и папки для счёта"],
];

export const portfolioGallery = [
  ...portfolioExamples.slice(1),
  ...additionalExamples.map(([number, collection, me, en, ru]): Example => ({
    id: `example-${String(number).padStart(2, "0")}`,
    collection,
    captions: { me: [me], en: [en], ru: [ru] },
  })),
];

export const portfolioGroups = [
  { id: "menus", label: "portfolioMenus", collections: ["menu-boards", "menu-covers", "menu-holders", "wall-menu-boards"] },
  { id: "table", label: "portfolioTable", collections: ["digital-menus", "restaurant-accessories"] },
  { id: "sets", label: "portfolioSets", collections: ["product-sets"] },
] as const satisfies readonly { id: string; label: string; collections: readonly string[] }[];
