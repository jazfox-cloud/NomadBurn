export type Destination =
  | "Chiang Mai"
  | "Bali Canggu"
  | "Lisbon"
  | "Medellin"
  | "Mexico City"
  | "Ho Chi Minh City"
  | "Bangkok"
  | "Tbilisi"
  | "Da Nang"
  | "Buenos Aires";

export type AccommodationStyle = "coliving" | "airbnb_solo" | "hostel";

export type CityCost = {
  baseLivingCost: number;
  colivingRent: number;
  airbnbRent: number;
  hostelRent: number;
  coworkingCost: number;
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
  Tbilisi: {
    baseLivingCost: 550,
    colivingRent: 450,
    airbnbRent: 650,
    hostelRent: 300,
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
  Medellin: "medellin",
  "Mexico City": "mexico-city",
  "Ho Chi Minh City": "ho-chi-minh-city",
  Bangkok: "bangkok",
  Tbilisi: "tbilisi",
  "Da Nang": "da-nang",
  "Buenos Aires": "buenos-aires",
};

export const cityCountries: Record<Destination, string> = {
  "Chiang Mai": "Thailand",
  "Bali Canggu": "Indonesia",
  Lisbon: "Portugal",
  Medellin: "Colombia",
  "Mexico City": "Mexico",
  "Ho Chi Minh City": "Vietnam",
  Bangkok: "Thailand",
  Tbilisi: "Georgia",
  "Da Nang": "Vietnam",
  "Buenos Aires": "Argentina",
};

export function cityLabel(city: Destination): string {
  return `${city}, ${cityCountries[city]}`;
}

export const cityFromSlug = Object.fromEntries(
  destinationNames.map((city) => [citySlugs[city], city]),
) as Record<string, Destination>;

export const cityImages: Record<Destination, { src: string; alt: string; creditHref: string }> = {
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
  Tbilisi: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/View_of_Tbilisi_from_Tabori_Church_2023-10-08-2.jpg/960px-View_of_Tbilisi_from_Tabori_Church_2023-10-08-2.jpg",
    alt: "View of Tbilisi from Tabori Church",
    creditHref: "https://en.wikipedia.org/wiki/Tbilisi",
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
