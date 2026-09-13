// ============================================================
// TIMES EYE — premium eyewear flagship (Gazipur, Dhaka)
// Single data file: edit this to rebrand / restock the store.
// Prices are demo values for the pitch — shop sets real ones.
// Checkout closes on WhatsApp; payment gateway comes later.
// ============================================================

export const brand = {
  name: "Times Eye",
  wordmark: "TIMES EYE",
  tagline: "Premium eyewear, honest prices.",
  descriptor: "Eyeglasses · Sunglasses · Premium Lenses · Watches",
  location: "Prokousholi Bhaban, Shop (Ground), Rajbari Road, Gazipur, Dhaka",
  email: "timeseye24@gmail.com",
  facebook: "Times Eye",
  whatsapp: "8801970230838", // shop's real WhatsApp
};

export const navbar = [
  { label: "Lenses", id: "lenses" },
  { label: "Eyewear", id: "eyewear" },
  { label: "Watches", id: "watches" },
  { label: "Why Us", id: "why" },
  { label: "Visit", id: "visit" },
];

// ---------------- HERO LENS/F RAME CONFIGURATOR ----------------
// The signature feature: pick a lens type + a frame tone and the
// glasses on screen change in real time (the GlassesBD killer,
// elevated). lens.tint drives the overlay; frame drives stroke.
export type LensType = {
  id: string;
  name: string;
  short: string;
  blurb: string;
  tint: string; // rgba / hex fill shown over clear lens
  glow: string; // accent for the active chip
  ridge?: boolean; // multi-coat sheen
};
export const lensTypes: LensType[] = [
  {
    id: "white",
    name: "Crystal White",
    short: "White",
    blurb: "Pure, clear everyday lens. Crisp vision, no tint.",
    tint: "rgba(220,240,255,0.06)",
    glow: "var(--color-ink)",
  },
  {
    id: "bluecut",
    name: "Blue Cut",
    short: "Blue Cut",
    blurb: "Filters harmful blue light from screens. Softer eyes, better sleep.",
    tint: "rgba(90,167,255,0.30)",
    glow: "var(--color-blue)",
  },
  {
    id: "coated",
    name: "Multi-Coated",
    short: "Multi Coat",
    blurb: "Anti-glare, anti-scratch, anti-UV. Less reflection, clearer all day.",
    tint: "rgba(127,227,216,0.22)",
    glow: "var(--color-cyan)",
    ridge: true,
  },
  {
    id: "photosun",
    name: "White Photosun",
    short: "White Photosun",
    blurb: "Stays clear indoors, darkens automatically in sunlight. One pair, both worlds.",
    tint: "rgba(224,164,88,0.30)",
    glow: "var(--color-amber)",
  },
  {
    id: "bluephotosun",
    name: "Blue Cut + Photosun",
    short: "Blue + Photosun",
    blurb: "Screen protection plus auto-darkening outdoors. The all-rounder.",
    tint: "rgba(90,130,210,0.40)",
    glow: "var(--color-blue)",
  },
  {
    id: "greencoated",
    name: "Green Coated Blue Cut",
    short: "Green Coated",
    blurb: "Green AR coating with blue-cut core. Low reflection, sharp contrast.",
    tint: "rgba(90,190,150,0.30)",
    glow: "var(--color-cyan)",
    ridge: true,
  },
];

export type FrameTone = {
  id: string;
  name: string;
  stroke: string;
};
export const frameTones: FrameTone[] = [
  { id: "blk", name: "Onyx", stroke: "#0d1317" },
  { id: "tort", name: "Tortoise", stroke: "#9a6b3f" },
  { id: "gun", name: "Gunmetal", stroke: "#6b7780" },
  { id: "gold", name: "Gold", stroke: "#c9a05a" },
  { id: "clear", name: "Clear", stroke: "#9fd0e6" },
];

// ---------------- LENS CATALOG (Luxotix-style premium) --------
export type LensProduct = {
  id: string;
  name: string;
  tag: string;
  desc: string;
  features: string[];
  base: string;
  tint: string;
  price: string;
};
export const lensProducts: LensProduct[] = [
  {
    id: "lp1",
    name: "Crystal White",
    tag: "Daily",
    desc: "Our clean everyday lens — clear, crisp, honest.",
    features: ["True clarity", "Anti-UV layer", "Comfort fit"],
    base: "linear-gradient(150deg,#2a3540,#10171b)",
    tint: "rgba(220,240,255,0.10)",
    price: "৳ 399",
  },
  {
    id: "lp2",
    name: "Blue Cut",
    tag: "Screen",
    desc: "Built for phones, laptops and long shifts.",
    features: ["Filters blue light", "Anti-glare", "Less eye strain"],
    base: "linear-gradient(150deg,#27406b,#14203a)",
    tint: "rgba(90,167,255,0.42)",
    price: "৳ 650",
  },
  {
    id: "lp3",
    name: "Multi-Coated",
    tag: "Premium",
    desc: "Multi-layer AR coating for minimal reflection.",
    features: ["Anti-reflection", "Anti-scratch", "Anti-UV"],
    base: "linear-gradient(150deg,#1d4a44,#10231f)",
    tint: "rgba(127,227,216,0.28)",
    price: "৳ 750",
  },
  {
    id: "lp4",
    name: "White Photosun",
    tag: "Auto",
    desc: "Transitions from clear inside to tinted in sunlight.",
    features: ["Auto darkening", "Blocks UV", "2-in-1 pair"],
    base: "linear-gradient(150deg,#7a5a2e,#3b2c14)",
    tint: "rgba(224,164,88,0.42)",
    price: "৳ 850",
  },
  {
    id: "lp5",
    name: "Blue Cut + Photosun",
    tag: "All-rounder",
    desc: "Screen protection that doubles as sunglasses outdoors.",
    features: ["Blue light block", "Auto darkening", "Full-day wear"],
    base: "linear-gradient(150deg,#2d4a86,#162540)",
    tint: "rgba(90,130,210,0.50)",
    price: "৳ 950",
  },
  {
    id: "lp6",
    name: "Green Coated Blue Cut",
    tag: "Pro",
    desc: "Green AR coat + blue-cut core for low-glare contrast.",
    features: ["Green AR coating", "Blue-cut core", "Sharp contrast"],
    base: "linear-gradient(150deg,#1e5a44,#0f2b20)",
    tint: "rgba(90,190,150,0.38)",
    price: "৳ 899",
  },
];

// ---------------- EYEWEAR / FRAMES ----------------------------
export type Piece = {
  id: string;
  name: string;
  category: "Eyeglasses" | "Sunglasses";
  lens: string; // lens name shown
  price: string;
  tag?: string;
  tone: string; // panel base
  frame: string; // accent line shown
};
export const pieces: Piece[] = [
  { id: "e1", name: "Aviator Classic", category: "Sunglasses", lens: "Polarized", price: "৳ 1,250", tag: "Bestseller", tone: "#17222a", frame: "#c9a05a" },
  { id: "e2", name: "Wayfarer", category: "Eyeglasses", lens: "Blue Cut", price: "৳ 1,150", tone: "#151c25", frame: "#0d1317" },
  { id: "e3", name: "Round Clubmaster", category: "Eyeglasses", lens: "Clear", price: "৳ 950", tag: "New", tone: "#1c2530", frame: "#6b7780" },
  { id: "e4", name: "Square Rim", category: "Eyeglasses", lens: "Clear", price: "৳ 850", tone: "#131b21", frame: "#9a6b3f" },
  { id: "e5", name: "Cat-Eye", category: "Sunglasses", lens: "Photosun", price: "৳ 1,300", tag: "Trending", tone: "#222a33", frame: "#c9a05a" },
  { id: "e6", name: "Oversize", category: "Sunglasses", lens: "Blue Cut", price: "৳ 1,050", tone: "#121920", frame: "#0d1317" },
];

// ---------------- WATCHES STRIP -------------------------------
export const watches = {
  label: "Also on the shelf",
  title: "Watches for every wrist.",
  line: "From everyday steel to statement pieces — paired with your frame, sized on the spot.",
  items: ["Dress Steel", "Ladies Chain", "Sports Chrono"],
};

// ---------------- WHY US (Lunettes-style trust) ----------------
export const pillars = [
  { stat: "100%", label: "Genuine fit & guidance", note: "In-store fitting, free prescription support." },
  { stat: "COD", label: "Cash on delivery", note: "Pay when it arrives, all over Bangladesh." },
  { stat: "48h", label: "Fast dispatch", note: "Most orders leave Gazipur same day." },
  { stat: "7-day", label: "Easy exchange", note: "Size or style not right? Swap it." },
];

// ---------------- STORE FRONT / STORY -------------------------
export const story = {
  label: "The Store",
  title: ["Look sharp,", "see sharp."],
  body:
    "Times Eye is a trusted eyewear house in Gazipur, Dhaka. We stock a wide range of frames, premium lenses, and watches — and we fit everything properly, in store. School, work, or the weekend: we help you see better and look your part.",
  points: [
    { t: "Real guidance", d: "Talk lenses and fit with people who know, not a sales script." },
    { t: "Wide stock", d: "Frames for every face and budget, lenses for every need." },
    { t: "Honest pricing", d: "Clear marked prices with COD and easy exchange." },
  ],
};

// ---------------- CONTACT / VISIT -----------------------------
export const visit = {
  label: "Visit or message",
  title: ["Find your", "perfect pair."],
  details: [
    { label: "Location", value: brand.location },
    { label: "Hours", value: "Open daily · 10 AM – 10 PM" },
  ],
  waText: "Hi Times Eye! I'd like to order eyewear.",
};

export const marquee = [
  "Blue Cut",
  "Crystal White",
  "Multi-Coated",
  "White Photosun",
  "Blue Cut + Photosun",
  "Green Coated",
  "Polarized",
  "Watches",
];