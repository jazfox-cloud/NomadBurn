export type Destination =
  | "Chiang Mai"
  | "Bali Canggu"
  | "Lisbon"
  | "Tbilisi"
  | "Budapest"
  | "Prague"
  | "Warsaw"
  | "Belgrade"
  | "Sofia"
  | "Bucharest"
  | "Medellin"
  | "Mexico City"
  | "Ho Chi Minh City"
  | "Bangkok"
  | "Kuala Lumpur"
  | "Da Nang"
  | "Buenos Aires";

export type AccommodationStyle = "coliving" | "airbnb_solo" | "hostel";
export type CityRegion = "Asia" | "Europe" | "Americas";

export type CityCost = {
  baseLivingCost: number;
  colivingRent: number;
  airbnbRent: number;
  hostelRent: number;
  coworkingCost: number;
};

export type CityDeepDive = {
  bestFor: string[];
  watchOuts: string[];
  budgetTraps: string[];
  runwayExample: string;
  planningNote: string;
};

export const cities: Record<Destination, CityCost> = {
  "Chiang Mai": {
    baseLivingCost: 500,
    colivingRent: 450,
    airbnbRent: 600,
    hostelRent: 300,
    coworkingCost: 5,
  },
  "Bali Canggu": {
    baseLivingCost: 700,
    colivingRent: 600,
    airbnbRent: 900,
    hostelRent: 350,
    coworkingCost: 6,
  },
  Lisbon: {
    baseLivingCost: 900,
    colivingRent: 700,
    airbnbRent: 1200,
    hostelRent: 500,
    coworkingCost: 4,
  },
  Tbilisi: {
    baseLivingCost: 550,
    colivingRent: 450,
    airbnbRent: 650,
    hostelRent: 300,
    coworkingCost: 3,
  },
  Budapest: {
    baseLivingCost: 750,
    colivingRent: 650,
    airbnbRent: 950,
    hostelRent: 400,
    coworkingCost: 4,
  },
  Prague: {
    baseLivingCost: 850,
    colivingRent: 750,
    airbnbRent: 1100,
    hostelRent: 450,
    coworkingCost: 5,
  },
  Warsaw: {
    baseLivingCost: 800,
    colivingRent: 700,
    airbnbRent: 1000,
    hostelRent: 450,
    coworkingCost: 5,
  },
  Belgrade: {
    baseLivingCost: 650,
    colivingRent: 550,
    airbnbRent: 800,
    hostelRent: 350,
    coworkingCost: 4,
  },
  Sofia: {
    baseLivingCost: 600,
    colivingRent: 500,
    airbnbRent: 750,
    hostelRent: 320,
    coworkingCost: 4,
  },
  Bucharest: {
    baseLivingCost: 650,
    colivingRent: 550,
    airbnbRent: 800,
    hostelRent: 350,
    coworkingCost: 4,
  },
  Medellin: {
    baseLivingCost: 600,
    colivingRent: 500,
    airbnbRent: 750,
    hostelRent: 350,
    coworkingCost: 4,
  },
  "Mexico City": {
    baseLivingCost: 700,
    colivingRent: 550,
    airbnbRent: 850,
    hostelRent: 400,
    coworkingCost: 4,
  },
  "Ho Chi Minh City": {
    baseLivingCost: 500,
    colivingRent: 400,
    airbnbRent: 550,
    hostelRent: 250,
    coworkingCost: 3,
  },
  Bangkok: {
    baseLivingCost: 650,
    colivingRent: 500,
    airbnbRent: 750,
    hostelRent: 350,
    coworkingCost: 5,
  },
  "Kuala Lumpur": {
    baseLivingCost: 600,
    colivingRent: 500,
    airbnbRent: 750,
    hostelRent: 320,
    coworkingCost: 3,
  },
  "Da Nang": {
    baseLivingCost: 500,
    colivingRent: 400,
    airbnbRent: 600,
    hostelRent: 250,
    coworkingCost: 3,
  },
  "Buenos Aires": {
    baseLivingCost: 650,
    colivingRent: 500,
    airbnbRent: 800,
    hostelRent: 350,
    coworkingCost: 4,
  },
};

export const destinationNames = Object.keys(cities) as Destination[];

export const citySlugs: Record<Destination, string> = {
  "Chiang Mai": "chiang-mai",
  "Bali Canggu": "bali-canggu",
  Lisbon: "lisbon",
  Tbilisi: "tbilisi",
  Budapest: "budapest",
  Prague: "prague",
  Warsaw: "warsaw",
  Belgrade: "belgrade",
  Sofia: "sofia",
  Bucharest: "bucharest",
  Medellin: "medellin",
  "Mexico City": "mexico-city",
  "Ho Chi Minh City": "ho-chi-minh-city",
  Bangkok: "bangkok",
  "Kuala Lumpur": "kuala-lumpur",
  "Da Nang": "da-nang",
  "Buenos Aires": "buenos-aires",
};

export const cityCountries: Record<Destination, string> = {
  "Chiang Mai": "Thailand",
  "Bali Canggu": "Indonesia",
  Lisbon: "Portugal",
  Tbilisi: "Georgia",
  Budapest: "Hungary",
  Prague: "Czech Republic",
  Warsaw: "Poland",
  Belgrade: "Serbia",
  Sofia: "Bulgaria",
  Bucharest: "Romania",
  Medellin: "Colombia",
  "Mexico City": "Mexico",
  "Ho Chi Minh City": "Vietnam",
  Bangkok: "Thailand",
  "Kuala Lumpur": "Malaysia",
  "Da Nang": "Vietnam",
  "Buenos Aires": "Argentina",
};

export const cityRegions: Record<Destination, CityRegion> = {
  "Chiang Mai": "Asia",
  "Bali Canggu": "Asia",
  Lisbon: "Europe",
  Tbilisi: "Europe",
  Budapest: "Europe",
  Prague: "Europe",
  Warsaw: "Europe",
  Belgrade: "Europe",
  Sofia: "Europe",
  Bucharest: "Europe",
  Medellin: "Americas",
  "Mexico City": "Americas",
  "Ho Chi Minh City": "Asia",
  Bangkok: "Asia",
  "Kuala Lumpur": "Asia",
  "Da Nang": "Asia",
  "Buenos Aires": "Americas",
};

export function cityLabel(city: Destination): string {
  return `${city}, ${cityCountries[city]}`;
}

export const cityFromSlug = Object.fromEntries(
  destinationNames.map((city) => [citySlugs[city], city]),
) as Record<string, Destination>;

type CityImage = {
  src: string;
  alt: string;
  creditHref: string;
  creditLabel?: string;
  licenseHref?: string;
  licenseLabel?: string;
  width?: number;
  height?: number;
};

export const cityImages: Record<Destination, CityImage> = {
  "Chiang Mai": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg/960px-0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg",
    alt: "Wat Phra Singh temple in Chiang Mai",
    creditHref: "https://en.wikipedia.org/wiki/Chiang_Mai",
  },
  "Bali Canggu": {
    src: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Canggu_Beach.jpg",
    alt: "Canggu Beach in Bali",
    creditHref: "https://commons.wikimedia.org/wiki/File:Canggu_Beach.jpg",
  },
  Lisbon: {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Lisboa_-_Portugal_%2852597836992%29.jpg",
    alt: "Lisbon city view in Portugal",
    creditHref: "https://en.wikipedia.org/wiki/Lisbon",
  },
  Medellin: {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/13/MEDELL%C3%8DN.jpg",
    alt: "Medellin city in the Aburra Valley",
    creditHref: "https://en.wikipedia.org/wiki/Medell%C3%ADn",
  },
  "Mexico City": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sobrevuelos_CDMX_HJ2A4913_%2825514321687%29_%28cropped%29.jpg/960px-Sobrevuelos_CDMX_HJ2A4913_%2825514321687%29_%28cropped%29.jpg",
    alt: "Aerial view of Mexico City",
    creditHref: "https://en.wikipedia.org/wiki/Mexico_City",
  },
  "Ho Chi Minh City": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ho_Chi_Minh_City_panorama_2019_%28cropped2%29.jpg/960px-Ho_Chi_Minh_City_panorama_2019_%28cropped2%29.jpg",
    alt: "Ho Chi Minh City skyline panorama",
    creditHref: "https://en.wikipedia.org/wiki/Ho_Chi_Minh_City",
  },
  Bangkok: {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7d/4Y1A1159_Bangkok_%2833536795515%29.jpg",
    alt: "Bangkok city and temple view",
    creditHref: "https://en.wikipedia.org/wiki/Bangkok",
  },
  "Kuala Lumpur": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Kuala_Lumpur_Skyline_at_dusk_1.jpg/960px-Kuala_Lumpur_Skyline_at_dusk_1.jpg",
    alt: "Kuala Lumpur skyline at dusk",
    creditHref: "https://commons.wikimedia.org/wiki/File:Kuala_Lumpur_Skyline_at_dusk_1.jpg",
    creditLabel: "Walkerssk / Wikimedia Commons",
    licenseHref: "https://creativecommons.org/publicdomain/zero/1.0/",
    licenseLabel: "CC0 1.0",
    width: 960,
    height: 555,
  },
  Tbilisi: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/View_of_Tbilisi_from_Tabori_Church_2023-10-08-2.jpg/960px-View_of_Tbilisi_from_Tabori_Church_2023-10-08-2.jpg",
    alt: "View of Tbilisi from Tabori Church",
    creditHref: "https://en.wikipedia.org/wiki/Tbilisi",
  },
  Budapest: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/View_from_Gell%C3%A9rt_Hill_to_the_Danube%2C_Hungary_-_Budapest_%2828493220635%29.jpg/960px-View_from_Gell%C3%A9rt_Hill_to_the_Danube%2C_Hungary_-_Budapest_%2828493220635%29.jpg",
    alt: "Budapest and the Danube from Gellert Hill",
    creditHref: "https://en.wikipedia.org/wiki/Budapest",
  },
  Prague: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Prague_%286365119737%29.jpg/960px-Prague_%286365119737%29.jpg",
    alt: "Prague city panorama with Charles Bridge and Prague Castle",
    creditHref: "https://en.wikipedia.org/wiki/Prague",
  },
  Warsaw: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Aleja_Niepdleglosci_Warsaw_2022_aerial_%28cropped%29.jpg/960px-Aleja_Niepdleglosci_Warsaw_2022_aerial_%28cropped%29.jpg",
    alt: "Warsaw skyline aerial view",
    creditHref: "https://en.wikipedia.org/wiki/Warsaw",
  },
  Belgrade: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Panorama_Belgrad.jpg/960px-Panorama_Belgrad.jpg",
    alt: "Panorama of Belgrade with the Church of Saint Sava",
    creditHref: "https://en.wikipedia.org/wiki/Belgrade",
  },
  Sofia: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Russian_church_%2837591925970%29.jpg/960px-Russian_church_%2837591925970%29.jpg",
    alt: "Central Sofia and Vitosha Mountain panorama",
    creditHref: "https://en.wikipedia.org/wiki/Sofia",
  },
  Bucharest: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bucharest_University_Square_%28cropped%29.jpg/960px-Bucharest_University_Square_%28cropped%29.jpg",
    alt: "Bucharest University Square city view",
    creditHref: "https://en.wikipedia.org/wiki/Bucharest",
  },
  "Da Nang": {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Dragon_Bridge%2C_Da_Nang_during_day_-_20230819_%28cropped%29.jpg",
    alt: "Dragon Bridge in Da Nang during the day",
    creditHref: "https://en.wikipedia.org/wiki/Da_Nang",
  },
  "Buenos Aires": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Puerto_Madero_-_Puente_de_la_mujer_%2844673627614%29.jpg/960px-Puerto_Madero_-_Puente_de_la_mujer_%2844673627614%29.jpg",
    alt: "Puerto Madero and Puente de la Mujer in Buenos Aires",
    creditHref: "https://en.wikipedia.org/wiki/Buenos_Aires",
  },
};

export const cityDeepDives: Partial<Record<Destination, CityDeepDive>> = {
  "Chiang Mai": {
    bestFor: [
      "Remote workers who want a lower baseline burn rate without giving up cafes, coworking, and a large nomad community.",
      "Founders or freelancers who need a quiet reset month where housing and daily food costs are easier to control.",
      "Nomads testing whether Southeast Asia can extend runway before committing to a more expensive base.",
    ],
    watchOuts: [
      "Air quality can change the real cost picture if you need air purifiers, short escapes, or a better sealed apartment.",
      "The cheapest rooms may be far from the work and social areas that make the city useful.",
      "Visa runs and regional flights should be treated as part of monthly burn, not a surprise expense.",
    ],
    budgetTraps: [
      "Overpaying for a short monthly rental before checking neighborhood walkability.",
      "Using cafe work every day without tracking the food and drink minimums.",
      "Assuming low base costs cancel out tax reserve or home-country fixed costs.",
    ],
    runwayExample:
      "A $12,000 savings buffer with $1,800 monthly income can look comfortable in Chiang Mai, but the plan is only durable if tax reserve, insurance, and travel buffers are funded every month.",
    planningNote:
      "Use Chiang Mai as the low-burn benchmark, then compare every higher-cost city against the number of extra client hours or product revenue it requires.",
  },
  "Bali Canggu": {
    bestFor: [
      "Nomads who value surf, wellness, creator communities, and frequent meetups enough to accept a higher lifestyle creep risk.",
      "Freelancers who can monetize network density and do not need the absolute cheapest Southeast Asia base.",
      "Remote workers who want a social landing pad for one to three months before choosing a quieter long-term base.",
    ],
    watchOuts: [
      "Canggu can become expensive quickly when transport, gym, coworking, and Western food all stack together.",
      "Monthly villas and private rooms vary widely by season, location, and how early you book.",
      "Traffic can turn a cheap room into an expensive decision if it sits far from your daily work spots.",
    ],
    budgetTraps: [
      "Pricing the trip from hostel costs while actually living a villa-and-coworking lifestyle.",
      "Ignoring scooter, ride-hailing, gym, and weekend trip costs.",
      "Treating a first-week social schedule as if it were a sustainable monthly budget.",
    ],
    runwayExample:
      "A $12,000 runway can shrink faster in Canggu than the headline Southeast Asia label suggests. Model the version of Bali you will actually live, not the cheapest version someone posted about.",
    planningNote:
      "Use Canggu as a lifestyle-creep stress test: if the calculator stays healthy here, cheaper nearby bases should give you more safety margin.",
  },
  Lisbon: {
    bestFor: [
      "Nomads who want European infrastructure, timezone overlap with both Europe and parts of the Americas, and a larger English-speaking remote-work scene.",
      "Remote employees with stable income who can justify a higher rent baseline for connectivity and quality of life.",
      "Founders who need a professional base for meetings, travel links, and a stronger long-stay routine.",
    ],
    watchOuts: [
      "Housing is the main pressure point; a small rent miss can dominate the entire monthly burn calculation.",
      "Seasonality can push short-stay prices above the calm planning estimate.",
      "Eating out, transport, and weekend travel can make the city feel less affordable than the rent number alone suggests.",
    ],
    budgetTraps: [
      "Using older Lisbon cost anecdotes that predate the current housing market.",
      "Comparing Lisbon to Southeast Asia without adding the income upside or timezone value.",
      "Forgetting that a higher fixed rent makes income dips more dangerous.",
    ],
    runwayExample:
      "With $12,000 saved, Lisbon can still be workable for a stable earner, but it leaves less room for income volatility than Chiang Mai or Da Nang.",
    planningNote:
      "Use Lisbon as the premium-base check: it should earn its place through timezone, clients, or life fit, not just vibes.",
  },
};
