export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type ListingType = "Villa" | "House" | "Apartment" | "Townhouse";
export type Deal = "Buy" | "Rent";

export type Listing = {
  slug: string;
  name: string;
  area: string;
  address: string;
  type: ListingType;
  deal: Deal;
  price: number; // USD, or USD per month for rentals
  beds: number;
  baths: number;
  sqm: number;
  year: number;
  cover: string;
  gallery: string[];
  blurb: string;
  features: string[];
};

export const listings: Listing[] = [
  {
    slug: "the-glasshouse",
    name: "The Glasshouse",
    area: "Trasacco Valley",
    address: "Trasacco Valley Estate, East Legon",
    type: "Villa",
    deal: "Buy",
    price: 1850000,
    beds: 5,
    baths: 6,
    sqm: 640,
    year: 2024,
    cover: "1613490493576-7fde63acd811",
    gallery: [
      "1613490493576-7fde63acd811",
      "1600210492486-724fe5c67fb0",
      "1600607687939-ce8a6c25118c",
      "1616594039964-ae9021a400a0",
      "1600566752355-35792bedcfea",
    ],
    blurb:
      "Floor-to-ceiling glass, a 20-metre infinity pool and a double-height living room that opens straight onto the garden. Built for long evenings and big gatherings.",
    features: ["Infinity pool", "Smart home", "Staff quarters", "Solar + backup", "Home cinema", "4-car garage"],
  },
  {
    slug: "cantonments-courtyard",
    name: "Cantonments Courtyard",
    area: "Cantonments",
    address: "Senchi Link, Cantonments",
    type: "House",
    deal: "Buy",
    price: 1240000,
    beds: 4,
    baths: 5,
    sqm: 420,
    year: 2023,
    cover: "1600585154340-be6161a56a0c",
    gallery: [
      "1600585154340-be6161a56a0c",
      "1600607687644-c7171b42498f",
      "1484154218962-a197022b5858",
      "1617806118233-18e1de247200",
      "1600573472550-8090b5e0745e",
    ],
    blurb:
      "A quiet, tree-shaded home arranged around a private courtyard, minutes from the embassies and Osu's restaurants.",
    features: ["Private courtyard", "Mature garden", "Study", "Borehole", "24h security", "Generator"],
  },
  {
    slug: "airport-sky-residence",
    name: "Airport Sky Residence",
    area: "Airport Residential",
    address: "4th Circular Rd, Airport Residential",
    type: "Apartment",
    deal: "Rent",
    price: 4800,
    beds: 3,
    baths: 3,
    sqm: 210,
    year: 2022,
    cover: "1460317442991-0ec209397118",
    gallery: [
      "1460317442991-0ec209397118",
      "1560448204-e02f11c3d0e2",
      "1556909114-f6e7ad7d3136",
      "1505693416388-ac5ce068fe85",
      "1600566752355-35792bedcfea",
    ],
    blurb:
      "A furnished corner apartment on the 9th floor with wraparound balconies, a rooftop pool and a concierge that handles everything.",
    features: ["Fully furnished", "Rooftop pool", "Gym", "Concierge", "Backup power", "2 parking bays"],
  },
  {
    slug: "labone-garden-townhouse",
    name: "Labone Garden Townhouse",
    area: "Labone",
    address: "Ndabaningi Sithole Rd, Labone",
    type: "Townhouse",
    deal: "Buy",
    price: 690000,
    beds: 3,
    baths: 4,
    sqm: 260,
    year: 2021,
    cover: "1600047509807-ba8f99d2cdde",
    gallery: [
      "1600047509807-ba8f99d2cdde",
      "1493809842364-78817add7ffb",
      "1484154218962-a197022b5858",
      "1505693416388-ac5ce068fe85",
    ],
    blurb:
      "One of six townhouses in a gated garden compound, with a rooftop terrace that catches the sea breeze.",
    features: ["Rooftop terrace", "Gated compound", "Shared pool", "Fitted kitchen", "Guest WC"],
  },
  {
    slug: "east-legon-poolhouse",
    name: "East Legon Poolhouse",
    area: "East Legon",
    address: "Lagos Avenue, East Legon",
    type: "Villa",
    deal: "Buy",
    price: 980000,
    beds: 4,
    baths: 5,
    sqm: 480,
    year: 2022,
    cover: "1580587771525-78b9dba3b914",
    gallery: [
      "1580587771525-78b9dba3b914",
      "1600210492486-724fe5c67fb0",
      "1522708323590-d24dbb6b0267",
      "1616594039964-ae9021a400a0",
      "1600566752355-35792bedcfea",
    ],
    blurb:
      "Clean modern lines, a cantilevered upper floor and a pool deck made for weekend barbecues.",
    features: ["Pool deck", "Outdoor kitchen", "Walk-in wardrobes", "Solar water", "Boys' quarters"],
  },
  {
    slug: "ridge-loft",
    name: "The Ridge Loft",
    area: "Ridge",
    address: "Castle Rd, Ridge",
    type: "Apartment",
    deal: "Rent",
    price: 2900,
    beds: 2,
    baths: 2,
    sqm: 135,
    year: 2020,
    cover: "1536376072261-38c75010e6c9",
    gallery: [
      "1536376072261-38c75010e6c9",
      "1502672260266-1c1ef2d93688",
      "1556909114-f6e7ad7d3136",
      "1600607687644-c7171b42498f",
    ],
    blurb:
      "A bright loft with exposed brick, built-in shelving and a walkable route to the business district.",
    features: ["Open-plan", "Built-in shelving", "Fibre internet", "Lift", "Backup power"],
  },
  {
    slug: "aburi-hillside",
    name: "Aburi Hillside Retreat",
    area: "Aburi",
    address: "Aburi-Peduase Rd, Aburi",
    type: "House",
    deal: "Buy",
    price: 540000,
    beds: 4,
    baths: 3,
    sqm: 380,
    year: 2019,
    cover: "1564013799919-ab600027ffc6",
    gallery: [
      "1564013799919-ab600027ffc6",
      "1600210492486-724fe5c67fb0",
      "1617806118233-18e1de247200",
      "1505693416388-ac5ce068fe85",
    ],
    blurb:
      "Cool mountain air, a wraparound veranda and a pool overlooking the hills, 45 minutes from the city.",
    features: ["Mountain views", "Veranda", "Pool", "Fruit garden", "Caretaker cottage"],
  },
  {
    slug: "osu-urban-flat",
    name: "Osu Urban Flat",
    area: "Osu",
    address: "Oxford St, Osu",
    type: "Apartment",
    deal: "Rent",
    price: 1800,
    beds: 1,
    baths: 1,
    sqm: 78,
    year: 2023,
    cover: "1545324418-cc1a3fa10c00",
    gallery: [
      "1545324418-cc1a3fa10c00",
      "1502672260266-1c1ef2d93688",
      "1484154218962-a197022b5858",
      "1600607687644-c7171b42498f",
    ],
    blurb:
      "Live above the buzz of Oxford Street with soundproofed windows, a co-working lounge and a rooftop bar.",
    features: ["Co-working lounge", "Rooftop bar", "Soundproofing", "Furnished", "Smart lock"],
  },
];

export type Area = {
  name: string;
  image: string;
  tagline: string;
  avgPrice: string;
  commute: string;
  vibe: string[];
};

export const areas: Area[] = [
  {
    name: "Cantonments",
    image: "1600585154340-be6161a56a0c",
    tagline: "Leafy streets, embassies and the city's quietest addresses.",
    avgPrice: "$1.1M",
    commute: "10 min to Airport City",
    vibe: ["Diplomatic", "Green", "Quiet"],
  },
  {
    name: "East Legon",
    image: "1580587771525-78b9dba3b914",
    tagline: "Big plots, bold architecture and the best brunch spots.",
    avgPrice: "$820K",
    commute: "15 min to Airport",
    vibe: ["Family", "Lively", "Modern"],
  },
  {
    name: "Airport Residential",
    image: "1460317442991-0ec209397118",
    tagline: "High-rise living next to the airport and business hubs.",
    avgPrice: "$4.2K / mo",
    commute: "5 min to Airport City",
    vibe: ["Executive", "Convenient", "Secure"],
  },
  {
    name: "Trasacco Valley",
    image: "1613490493576-7fde63acd811",
    tagline: "Gated estate living at the very top of the market.",
    avgPrice: "$1.9M",
    commute: "20 min to Ridge",
    vibe: ["Exclusive", "Gated", "Spacious"],
  },
  {
    name: "Aburi",
    image: "1564013799919-ab600027ffc6",
    tagline: "Mountain air and weekend-home calm, 45 minutes out.",
    avgPrice: "$480K",
    commute: "45 min to Accra",
    vibe: ["Retreat", "Views", "Nature"],
  },
];

export type Room = {
  name: string;
  image: string;
  hotspots: { x: number; y: number; title: string; body: string }[];
};

export const rooms: Room[] = [
  {
    name: "Living",
    image: "1600210492486-724fe5c67fb0",
    hotspots: [
      { x: 30, y: 55, title: "Double-height ceiling", body: "6.2 m ceilings with clerestory windows for all-day light." },
      { x: 72, y: 62, title: "Oak flooring", body: "Wide-plank engineered oak, sealed for Accra humidity." },
      { x: 52, y: 22, title: "Gallery wall", body: "Picture rail lighting on a dedicated dimmer circuit." },
    ],
  },
  {
    name: "Kitchen",
    image: "1484154218962-a197022b5858",
    hotspots: [
      { x: 42, y: 70, title: "Quartz island", body: "3.4 m island with seating for four and a prep sink." },
      { x: 18, y: 45, title: "Integrated appliances", body: "Bosch oven, induction hob and a 600 L fridge." },
      { x: 62, y: 20, title: "Pendant lighting", body: "Warm 2700 K pendants on a separate scene." },
    ],
  },
  {
    name: "Bedroom",
    image: "1616594039964-ae9021a400a0",
    hotspots: [
      { x: 50, y: 62, title: "Upholstered headboard", body: "Bespoke king bed included in the sale." },
      { x: 85, y: 40, title: "Blackout drapes", body: "Motorised, linked to the morning alarm." },
    ],
  },
  {
    name: "Bath",
    image: "1600566752355-35792bedcfea",
    hotspots: [
      { x: 22, y: 70, title: "Freestanding tub", body: "Cast stone tub with a floor-mounted mixer." },
      { x: 60, y: 30, title: "Rain shower", body: "Walk-in shower with a 300 mm rain head." },
    ],
  },
];

export const formatPrice = (l: Pick<Listing, "price" | "deal">) =>
  l.deal === "Rent"
    ? `$${l.price.toLocaleString()} / mo`
    : l.price >= 1000000
      ? `$${(l.price / 1000000).toFixed(2).replace(/\.?0+$/, "")}M`
      : `$${Math.round(l.price / 1000)}K`;
