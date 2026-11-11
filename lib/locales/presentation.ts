import { editorial, materials, services } from "../content";

export const presentation = {
  en: {
    alt: Object.fromEntries(Object.entries(editorial).map(([key, image]) => [key, image.alt])),
    materials,
    services: [
      { ...services[0], message: "Hello Folia, I’m interested in menu design and redesign. I’d like to discuss my venue." },
      { ...services[1], message: "Hello Folia, I’m interested in QR menu design. I’d like to discuss my venue." },
      { ...services[2], message: "Hello Folia, I’m interested in website design. I’d like to discuss my venue." },
    ],
  },
  me: {
    alt: {
      hero: "Folia jelovnik i mapa za račun na drvenom restoranskom stolu",
      leather: "Uzorci kože, tkanine, filca i drveta",
      qr: "Digitalni jelovnik na telefonu pored bordo QR stalka",
      embossed: "Mapa za račun, blok za konobare i oznaka za rezervisani sto",
      stitch: "Izbor završnih obrada kože i tkanine",
      process: "Priprema izgleda jelovnika i izbor materijala",
      dining: "Restoranski enterijer s drvenim stolovima i bordo sjedištima",
      website: "Sajt za ugostiteljski objekat prikazan na laptopu i telefonu",
    },
    materials: ["Prirodna koža", "Veganska koža", "Tkanine", "Drvo", "Završna obrada po mjeri"],
    services: [
      {
        title: "Dizajn i redizajn jelovnika",
        copy: "Novi raspored, osvježeni vizuelni stil ili potpuni redizajn postojećeg jelovnika. Krećemo od vaše ponude, ambijenta i načina usluge.",
        points: ["Raspored i tipografija jelovnika", "Priprema za štampu", "Boje brenda i nanošenje logotipa"],
        message: "Poštovani, interesuje me dizajn jelovnika za moj objekat.",
      },
      {
        title: "Vaš jelovnik na svakom telefonu.",
        copy: "QR jelovnik s vašim logotipom, jasnim kategorijama i rasporedom koji se lako čita za stolom. Uz digitalni jelovnik možemo pripremiti i odgovarajući stalak.",
        points: ["QR jelovnik u vašem vizuelnom stilu", "Pregledan prikaz na telefonu", "Usklađeni QR i NFC stalci"],
        message: "Poštovani, interesuje me izrada QR jelovnika za moj objekat.",
      },
      {
        title: "Sajt po mjeri vašeg objekta.",
        copy: "Sajt za vaš restoran, hotel, bar ili kafić. Na jednom mjestu predstavljamo vašu priču, jelovnik, fotografije i kontakt.",
        points: ["Dizajn i izrada sajta", "Prikaz prilagođen svim ekranima", "Jelovnik, lokacija i kontakt"],
        message: "Poštovani, interesuje me izrada sajta za moj objekat.",
      },
    ],
  },
  ru: {
    alt: {
      hero: "Меню Folia и папка для счёта на деревянном столе ресторана",
      leather: "Образцы кожи, ткани, фетра и дерева",
      qr: "Цифровое меню на телефоне рядом с бордовой QR-подставкой",
      embossed: "Папка для счёта, блокнот официанта и табличка резерва",
      stitch: "Варианты отделки из кожи и ткани",
      process: "Работа над вёрсткой меню и выбор материалов",
      dining: "Интерьер ресторана с деревянными столами и бордовыми сиденьями",
      website: "Сайт заведения на экранах ноутбука и телефона",
    },
    materials: ["Натуральная кожа", "Веганская кожа", "Ткани", "Дерево", "Отделка на заказ"],
    services: [
      {
        title: "Дизайн и редизайн меню",
        copy: "Новая вёрстка, обновление оформления или полный редизайн действующего меню. Учитываем вашу кухню, интерьер и формат обслуживания.",
        points: ["Вёрстка и типографика меню", "Подготовка макетов к печати", "Фирменные цвета и нанесение логотипа"],
        message: "Здравствуйте! Хотелось бы обсудить дизайн меню для моего заведения.",
      },
      {
        title: "Ваше меню на любом телефоне.",
        copy: "QR-меню с вашим логотипом, понятными разделами и удобной вёрсткой для чтения за столом. К цифровому меню подберём подходящую подставку.",
        points: ["QR-меню в фирменном стиле", "Удобный просмотр на телефоне", "QR- и NFC-подставки в едином стиле"],
        message: "Здравствуйте! Хотелось бы заказать QR-меню для моего заведения.",
      },
      {
        title: "Сайт в стиле вашего заведения.",
        copy: "Разработаем сайт для ресторана, отеля, бара или кафе. Объединим историю заведения, меню, фотографии и контакты.",
        points: ["Дизайн и разработка сайта", "Удобный просмотр на разных экранах", "Меню, адрес и контакты"],
        message: "Здравствуйте! Хотелось бы обсудить разработку сайта для моего заведения.",
      },
    ],
  },
};
