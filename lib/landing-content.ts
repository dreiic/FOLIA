import type { Locale } from "./routing";
import { menuDesignPath, waiterFoldersPath } from "./seo";

export const landingKinds = {
  [menuDesignPath]: "menuDesign",
  [waiterFoldersPath]: "waiterFolders",
} as const;

export type LandingKind = (typeof landingKinds)[keyof typeof landingKinds];

type Landing = {
  title: string;
  description: string;
  intro: string;
  detailsTitle: string;
  details: [string, string][];
  briefTitle: string;
  brief: string;
};

export const landingContent: Record<Locale, Record<LandingKind, Landing>> = {
  me: {
    menuDesign: {
      title: "Izrada jelovnika po narudžbi u Crnoj Gori",
      description: "Dizajn i redizajn jelovnika, vinskih karata i menija pića za restorane, hotele i kafiće. Priprema za štampu i digitalni QR meni.",
      intro: "Folia iz Podgorice dizajnira jelovnike po narudžbi za restorane, hotele i kafiće širom Crne Gore. Možemo početi od vašeg sadašnjeg menija, skice ili spiska jela i pića.",
      detailsTitle: "Šta možemo pripremiti za vaš lokal",
      details: [
        ["Novi jelovnik ili redizajn", "Rasporedimo hranu, piće i sezonsku ponudu u jasne cjeline. Tipografiju, boje i format uskladimo s vašim logotipom i prostorom."],
        ["Jelovnik i vinska karta za štampu", "Pripremimo fajlove za dogovorene dimenzije. Ako već imate korice, pošaljite dimenzije umetka i fotografiju načina pričvršćivanja stranica."],
        ["Štampani i QR meni u istom stilu", "Štampano izdanje i digitalni jelovnik mogu dijeliti isti vizuelni identitet. Za prikaz na telefonu prilagođavamo raspored i veličinu teksta."],
      ],
      briefTitle: "Šta nam treba za ponudu?",
      brief: "Pošaljite postojeći meni ili spisak jela i pića, logotip i recite na kojim jezicima želite jelovnik. Navedite treba li vam priprema za štampu, QR verzija, korice ili komplet.",
    },
    waiterFolders: {
      title: "Konobarski folderi po mjeri u Crnoj Gori",
      description: "Mape i blokovi za konobare prilagođeni formatu narudžbenice i izgledu lokala. Uskladite foldere s jelovnicima i mapama za račun.",
      intro: "Konobarski folder drži blok za narudžbe i papiriće pri ruci tokom smjene. Za restorane, hotele i kafiće u Crnoj Gori pomažemo da odaberete format i završnu obradu prema načinu rada vašeg osoblja.",
      detailsTitle: "Kako odabrati folder za konobare",
      details: [
        ["Dimenzije bloka i foldera", "Izmjerite blok koji osoblje koristi i provjerite gdje će nositi folder. Tako možemo predložiti format koji odgovara i bloku i džepu kecelje."],
        ["Logo i završna obrada", "Pošaljite logotip i recite želite li da folderi prate boju i teksturu korica jelovnika. Predložićemo opcije prema odabranom modelu."],
        ["Konobarski folder i mapa za račun", "Folder služi osoblju za bilježenje narudžbi, a mapa za račun predaje se gostu. Možete ih naručiti kao usklađen komplet."],
      ],
      briefTitle: "Šta nam treba za ponudu?",
      brief: "Pošaljite dimenzije ili fotografiju bloka, broj foldera koji vam treba i logotip ako želite personalizaciju. Recite nam treba li da ih uskladimo s koricama ili mapama za račun.",
    },
  },
  en: {
    menuDesign: {
      title: "Custom Menu Design in Montenegro",
      description: "Menu design and redesign for restaurants, hotels and cafés, with print-ready artwork and QR menus styled for your venue.",
      intro: "Folia designs custom menus for restaurants, hotels and cafés across Montenegro. Send us your current menu, a rough layout or a list of dishes and drinks to get started.",
      detailsTitle: "What we can design for your venue",
      details: [
        ["New menus and redesigns", "We organize food, drinks and seasonal offers into clear sections, then match the typography, colors and format to your brand and venue."],
        ["Print-ready menus and wine lists", "We prepare artwork for your chosen dimensions. If you already have covers, send us the insert size and a photo of how the pages are held in place."],
        ["Coordinated printed and QR menus", "Your printed and digital menus can share a visual identity, with a layout and type sizes adapted for phones."],
      ],
      briefTitle: "What to send for a quote",
      brief: "Share your current menu or item list, your logo and the languages you need. Tell us whether you want print-ready artwork, a QR menu, covers or the full set.",
    },
    waiterFolders: {
      title: "Custom Waiter Folders in Montenegro",
      description: "Waiter folders and server books sized for your order pads and coordinated with your menu covers and bill presenters.",
      intro: "A waiter folder keeps order pads and loose slips together during service. We help restaurants, hotels and cafés in Montenegro choose a format and finish that suit their team.",
      detailsTitle: "How to choose a server book",
      details: [
        ["Order pad and folder size", "Measure the pad your team uses and check where the folder will be carried. We can suggest a format that fits the pad and an apron pocket."],
        ["Logo and finish", "Share your logo and let us know if the folder should match the color and texture of your menus. We’ll suggest finishes for the chosen model."],
        ["Waiter folders and bill presenters", "Staff use waiter folders to take orders and hand bill presenters to guests at the end of the meal. You can order them in a coordinated finish."],
      ],
      briefTitle: "What to send for a quote",
      brief: "Send the pad dimensions or a photo, the number of folders you need and your logo for personalization. Let us know if you want matching menu covers or bill presenters.",
    },
  },
  ru: {
    menuDesign: {
      title: "Дизайн меню на заказ в Черногории",
      description: "Разработка и редизайн меню, винных карт и карт напитков для ресторанов, отелей и кафе. Макеты для печати и QR-меню.",
      intro: "Folia разрабатывает меню на заказ для ресторанов, отелей и кафе по всей Черногории. Можно начать с вашего действующего меню, эскиза или списка блюд и напитков.",
      detailsTitle: "Что мы можем подготовить для вашего заведения",
      details: [
        ["Новое меню или редизайн", "Распределим блюда, напитки и сезонные предложения по понятным разделам. Подберём шрифты, цвета и формат под стиль заведения."],
        ["Меню и винные карты для печати", "Подготовим макеты в согласованном формате. Если у вас уже есть обложки, пришлите размеры вкладыша и фотографию крепления страниц."],
        ["Печатное меню и QR-меню в одном стиле", "Обе версии могут сохранить единое оформление. Для чтения на телефоне адаптируем расположение разделов и размер текста."],
      ],
      briefTitle: "Что нужно для расчёта стоимости",
      brief: "Пришлите действующее меню или список позиций, логотип и укажите языки. Расскажите, нужны ли вам макеты для печати, QR-меню, обложки или полный комплект.",
    },
    waiterFolders: {
      title: "Папки официанта на заказ в Черногории",
      description: "Папки для блокнотов официантов с учётом формата и стиля заведения. Подберём оформление в тон обложкам меню и папкам для счёта.",
      intro: "В папке официанта удобно держать блокнот для заказов и рабочие записи. Помогаем ресторанам, отелям и кафе Черногории подобрать формат и отделку для ежедневной работы.",
      detailsTitle: "Как выбрать папку официанта",
      details: [
        ["Размер блокнота и папки", "Измерьте блокнот и уточните, где сотрудники носят папку. Это поможет подобрать формат, который подойдёт и для блокнота, и для кармана фартука."],
        ["Логотип и отделка", "Пришлите логотип и уточните, нужно ли подобрать цвет и фактуру в тон обложкам меню. Предложим варианты отделки для выбранной модели."],
        ["Папки официанта и папки для счёта", "Папку официант использует для записи заказов, а папку со счётом подаёт гостю. Обе позиции можно заказать в едином оформлении."],
      ],
      briefTitle: "Что нужно для расчёта стоимости",
      brief: "Пришлите размеры или фотографию блокнота, количество папок и логотип, если нужна персонализация. Уточните, нужно ли подобрать обложки меню и папки для счёта в том же стиле.",
    },
  },
};
