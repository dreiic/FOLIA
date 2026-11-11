type CollectionGuide = {
  options: { label: string; description: string }[];
  brief: string;
  related: string[];
};

export const collectionGuides: Record<string, CollectionGuide> = {
  "menu-covers": {
    options: [
      { label: "Cover materials", description: "Choose from genuine leather, smooth or nubuck-look PU, woven fabric, felt, and wood. Some felt covers pair a textile face with a rigid wood back." },
      { label: "Paper sizes", description: "A4 and A5 are starting points for food menus and wine lists. Selected covers also take Letter, Half Letter, narrow, and square inserts." },
      { label: "Binding and page changes", description: "Ring binders suit hole-punched pages. Screw posts secure a stack of sheets, while corner mounts hold a single insert. Elastic bindings can hold folded menus." },
      { label: "Logo application", description: "Consider blind embossing on leather, a branded leather patch on felt, or engraving and UV printing on selected wood covers." },
    ],
    brief: "Send your current menu or its paper dimensions, the number of pages, how often they change, and how many covers you need.",
    related: ["menu-inserts", "restaurant-accessories", "samples"],
  },
  "hotel-guest-folders": {
    options: [
      { label: "In-room directories", description: "Plan space for Wi-Fi information, breakfast and checkout times, room service, and local recommendations." },
      { label: "Reception folders", description: "Choose a layout for welcome letters, itineraries, or printed guest information. Interior pockets can keep loose sheets together." },
      { label: "Material and layout", description: "Compare leather and fabric finishes, then choose a size around the documents you use. A replaceable insert is useful when guest information changes seasonally." },
    ],
    brief: "Tell us what each folder should contain, the insert dimensions, and how many rooms or reception desks you’re outfitting.",
    related: ["signage", "menu-inserts", "samples"],
  },
  "restaurant-accessories": {
    options: [
      { label: "Bill presenters", description: "Compare wooden, leather, and felt styles. Look for a pocket or holder that fits your receipt and the way your team presents the bill." },
      { label: "Server books", description: "Choose a format that fits the order pad and slips your team carries. Coordinate the finish with the menus and bill presenters." },
      { label: "Reserved signs", description: "Wooden tabletop signs can carry reservation wording and a logo. Consider whether guests need to read the sign from both sides of the table." },
    ],
    brief: "Tell us which pieces you’d like to match, the size of your receipts or order pads, and how many tables or staff you’re equipping.",
    related: ["menu-covers", "table-service", "product-sets"],
  },
  "digital-menus": {
    options: [
      { label: "QR displays", description: "Choose clear acrylic, a printed or engraved wooden stand, or a plywood display. Your QR code can sit alongside the venue name or logo." },
      { label: "NFC displays", description: "Selected stands open a menu link when tapped with a compatible phone. Choose a combined QR and NFC display so guests can also scan with their camera." },
      { label: "Digital menu design", description: "Use an existing menu link or ask us to design the mobile menu. We can organize food, drinks, and seasonal items into clear sections and match the layout to your branding." },
    ],
    brief: "Share your current menu or link, your logo, and where the stands will sit. Tell us whether you need a physical display, a digital menu, or both.",
    related: ["menu-holders", "menu-covers", "signage"],
  },
  "menu-holders": {
    options: [
      { label: "Wooden bases", description: "A slotted or magnetic holder keeps a menu card upright. Consider the insert thickness and how often staff will swap it." },
      { label: "Clear acrylic", description: "Choose a tabletop display for printed sheets or signs. Selected wood-base acrylic models take A4 or Letter inserts." },
      { label: "Table tents and talkers", description: "Use a compact format for drinks, specials, or promotions. Choose a display that can be read from both sides for shared tables." },
    ],
    brief: "Send the dimensions of the card or paper you’ll display and where it will sit, such as a table, bar, or reception counter.",
    related: ["digital-menus", "menu-inserts", "menu-boards"],
  },
  "menu-boards": {
    options: [
      { label: "Clips and clamp bars", description: "A clip makes it easy to change a specials sheet. A screw-fastened bar holds a stack in place and keeps the top edge aligned." },
      { label: "Rings and corners", description: "Ring bindings take punched sheets, while corner mounts frame a single sheet. Check the binding against how the menu will be handled during service." },
      { label: "Board finishes", description: "Compare wood, leather-faced, and felt-front styles. Depending on the board, a logo can be engraved on wood or applied to the facing material." },
    ],
    brief: "Share your page size, number of sheets, and how often the menu changes. We can help match the fastening to the insert.",
    related: ["menu-inserts", "menu-covers", "wall-menu-boards"],
  },
  "wall-menu-boards": {
    options: [
      { label: "Oak rails", description: "Natural, oiled, and dark rails give different contrast against the wall. Arrange the rails around the number of categories and lines you need." },
      { label: "Changeable lettering", description: "Selected systems use interchangeable acrylic or HDF characters for drinks, specials, and prices. Plan spare characters around the items you change most often." },
      { label: "Placement", description: "Consider the reading distance, available wall width, and any obstructions above the counter when choosing the layout." },
    ],
    brief: "Send a wall photo, its usable dimensions, and the longest menu or price list you want to display.",
    related: ["signage", "menu-boards", "menu-holders"],
  },
  "table-service": {
    options: [
      { label: "Cutlery and napkins", description: "Compare wooden caddies and leather cases for cutlery, plus holders sized for cocktail or luncheon napkins." },
      { label: "Serving pieces", description: "Choose a tray, tasting board, or divided board around what you serve and how much room it needs on the table." },
      { label: "Placemats and coasters", description: "Plan the size around your plates and glassware. Leather styles and wood pieces can be coordinated with your menus and bill presenters." },
    ],
    brief: "Share what needs to fit in each piece, your table dimensions, and the finish you’d like to match.",
    related: ["restaurant-accessories", "product-sets", "samples"],
  },
  signage: {
    options: [
      { label: "Rooms and doors", description: "Plan room numbers, door hangers, and floor directories as a matching set. Provide the room list before finalizing layouts." },
      { label: "Directional and information signs", description: "Use consistent wording and symbols for entrances, restrooms, parking, and guest areas. Sign placement and reading distance help determine the format." },
      { label: "Business signs", description: "Consider engraved or printed plaques, interior branding, and lightbox options. The material and fixing depend on the location and surface." },
    ],
    brief: "Send the wording, approximate dimensions, and a photo of each location, including which signs will go outside.",
    related: ["hotel-guest-folders", "wall-menu-boards", "digital-menus"],
  },
  "menu-inserts": {
    options: [
      { label: "Print and finish", description: "Compare matte and gloss printing based on the paper, venue lighting, and how often the inserts will be handled." },
      { label: "Sheet formats", description: "Plan around A-series, U.S., or narrow sheets. Measure the existing insert and check the usable space around the binding before laying out a new menu." },
      { label: "Protective sleeves", description: "Choose hole-punched or center-fold sleeves to suit the cover. Check both the sleeve’s outer dimensions and the paper size it takes." },
    ],
    brief: "Send the menu file or a photo of the old insert, the paper dimensions, page count, and binding type.",
    related: ["menu-covers", "menu-boards", "menu-holders"],
  },
  "product-sets": {
    options: [
      { label: "Restaurants and lodges", description: "Coordinate dinner and wine menus with bill presenters, reserved signs, and tabletop pieces." },
      { label: "Cafés, bars, and pubs", description: "Pair coffee, cocktail, or beer menus with countertop displays, coasters, or QR stands. Choose what belongs at the counter and what stays on each table." },
      { label: "Shared finishes", description: "Repeat a wood tone, leather color, or logo treatment across the set. We’ll check which options are available for each piece." },
    ],
    brief: "Share your venue concept, table count, and the pieces you need for opening day or a refresh.",
    related: ["menu-covers", "table-service", "samples"],
  },
  samples: {
    options: [
      { label: "Wood finishes", description: "Compare tones and visible grain against your furniture or table setting. Selected pieces offer natural, stained, or coated finishes." },
      { label: "Leather and PU", description: "Compare color, texture, and flexibility in person. A sample helps when matching a cover to upholstery or an existing bill presenter." },
      { label: "Textiles and felt", description: "Compare woven fabrics and felt for color and surface texture. A mixed set is useful when you’re choosing across several product families." },
    ],
    brief: "Tell us which products you’re considering and which colors or materials you want to compare. A photo of your space can help narrow the selection.",
    related: ["menu-covers", "hotel-guest-folders", "product-sets"],
  },
};
