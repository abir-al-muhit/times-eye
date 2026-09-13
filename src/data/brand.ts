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
  { label: "Shop", id: "shop" },
  { label: "Collections", id: "collections" },
  { label: "Lenses", id: "lenses" },
  { label: "Why Us", id: "why" },
  { label: "Visit", id: "visit" },
];

/* ---------------- HERO SLIDER ------------------------------ */
export type HeroSlide = {
  id: string;
  kicker: string;
  title: string;   // up to 3 words
  line: string;
  cta: string;
  tone: string;    // gradient base
  frame: string;   // glyph stroke
  shape: "aviator" | "round" | "square" | "cat";
};
export const heroSlides: HeroSlide[] = [
  {
    id: "s1",
    kicker: "NEW ARRIVALS",
    title: "See the world in crisp blue cut.",
    line: "Eyeglasses, sunglasses and pro lenses. Fitted properly, priced honestly, COD nationwide.",
    cta: "Shop the new",
    tone: "linear-gradient(140deg,#dde6f5,#eef2f8)",
    frame: "#2f5fb0",
    shape: "aviator",
  },
  {
    id: "s2",
    kicker: "COLLECTIONS",
    title: "Frames for every face.",
    line: "Men's, women's, premium and custom — a shape for every personality and budget.",
    cta: "Browse collections",
    tone: "linear-gradient(140deg,#f0e6d6,#f6efe3)",
    frame: "#a86a2a",
    shape: "round",
  },
  {
    id: "s3",
    kicker: "PREMIUM LENSES",
    title: "Photosun that adapts with you.",
    line: "Clear indoors, tinted outdoors. Multi-coated, blue cut, and more.",
    cta: "Explore lenses",
    tone: "linear-gradient(140deg,#dfeae0,#edf3ee)",
    frame: "#3c6e3f",
    shape: "square",
  },
];

/* ---------------- COLLECTIONS ------------------------------ */
export type Collection = {
  id: string;
  name: string;
  type: string;   // "MEN'S" | "WOMEN'S" | ...
  href: string;
  count: string;
  tone: string;
  frame: string;
  shape: string;
};
export const collections: Collection[] = [
  { id: "c1", name: "Men's Collection", type: "MEN'S", href: "#shop", count: "35+ styles", tone: "linear-gradient(150deg,#1f4688,#dde6f5)", frame: "#fff", shape: "aviator" },
  { id: "c2", name: "Women's Collection", type: "WOMEN'S", href: "#shop", count: "40+ styles", tone: "linear-gradient(150deg,#b5738a,#f0dfe5)", frame: "#fff", shape: "cat" },
  { id: "c3", name: "Brand Collection", type: "BRANDS", href: "#shop", count: "Top labels", tone: "linear-gradient(150deg,#4a3d2a,#efe6d4)", frame: "#fff", shape: "round" },
  { id: "c4", name: "Premium Tier", type: "PREMIUM", href: "#shop", count: "Limited", tone: "linear-gradient(150deg,#2c2c2c,#6b6b6b)", frame: "#fff", shape: "square" },
  { id: "c5", name: "Custom Build", type: "CUSTOM", href: "#shop", count: "Made for you", tone: "linear-gradient(150deg,#3c6e3f,#dfeae0)", frame: "#fff", shape: "round" },
];

/* ---------------- LENS TYPES (for product config) --------- */
export type LensType = {
  id: string;
  name: string;
  short: string;
  blurb: string;
  tint: string;
  glow: string;
  price: string;
  ridge?: boolean;
};
export const lensTypes: LensType[] = [
  { id: "white", name: "Crystal White", short: "White", blurb: "Pure, clear everyday lens — crisp vision, no tint.", tint: "rgba(220,240,255,0.05)", glow: "var(--color-ink)", price: "৳ 0" },
  { id: "bluecut", name: "Blue Cut", short: "Blue Cut", blurb: "Filters harmful blue light from screens. Softer eyes, better sleep.", tint: "rgba(47,95,176,0.32)", glow: "var(--color-blue)", price: "৳ 650" },
  { id: "coated", name: "Multi-Coated", short: "Multi Coat", blurb: "Anti-glare, anti-scratch, anti-UV. Less reflection, clearer all day.", tint: "rgba(60,110,170,0.24)", glow: "var(--color-blue)", price: "৳ 750", ridge: true },
  { id: "photosun", name: "White Photosun", short: "White Photosun", blurb: "Clear inside, darkens automatically in sunlight. One pair, both worlds.", tint: "rgba(168,106,42,0.32)", glow: "var(--color-ink)", price: "৳ 850" },
  { id: "bluephotosun", name: "Blue Cut + Photosun", short: "Blue + Photosun", blurb: "Screen protection plus auto-darkening outdoors. The all-rounder.", tint: "rgba(47,75,140,0.42)", glow: "var(--color-blue)", price: "৳ 950" },
  { id: "greencoated", name: "Green Coated Blue Cut", short: "Green Coated", blurb: "Green AR coating with blue-cut core. Low reflection, sharp contrast.", tint: "rgba(52,120,84,0.34)", glow: "var(--color-ink)", price: "৳ 899", ridge: true },
];

export type FrameTone = { id: string; name: string; stroke: string };
export const frameTones: FrameTone[] = [
  { id: "blk", name: "Onyx", stroke: "#1c1c1c" },
  { id: "tort", name: "Tortoise", stroke: "#9a6b3f" },
  { id: "gun", name: "Gunmetal", stroke: "#6b7780" },
  { id: "gold", name: "Gold", stroke: "#c9a05a" },
  { id: "clear", name: "Clear", stroke: "#9fd0e6" },
];

/* ---------------- SHOP PIECES ------------------------------ */
export type Piece = {
  id: string;
  name: string;
  brand?: string;
  category: "Eyeglasses" | "Sunglasses";
  gender: "Men" | "Women" | "Unisex";
  frame: string;
  lens: string;   // lens name shown
  price: string;
  compareAt?: string;
  tag?: string;   // "New" | "Bestseller" | "Hot"
  tone: string;
  accent: string;
  shape: string;
};
export const pieces: Piece[] = [
  { id: "e1", name: "Aviator", brand: "Times", category: "Sunglasses", gender: "Men", frame: "#8a8f98", lens: "Polarized", price: "৳ 1,250", compareAt: "৳ 1,600", tag: "Bestseller", tone: "#e3e8ef", accent: "#2f5fb0", shape: "aviator" },
  { id: "e2", name: "Wayfarer", brand: "Times", category: "Eyeglasses", gender: "Unisex", frame: "#1c1c1c", lens: "Blue Cut", price: "৳ 1,150", tag: "New", tone: "#ece7db", accent: "#3c5a8a", shape: "aviator" },
  { id: "e3", name: "Round Classic", brand: "Times", category: "Eyeglasses", gender: "Women", frame: "#9a6b3f", lens: "Clear", price: "৳ 950", tag: "Hot", tone: "#f0e2d0", accent: "#a86a2a", shape: "round" },
  { id: "e4", name: "Square Minimal", brand: "Times", category: "Eyeglasses", gender: "Men", frame: "#6b7780", lens: "Clear", price: "৳ 850", tone: "#e7e9ec", accent: "#5c6b7a", shape: "square" },
  { id: "e5", name: "Cat-Eye", brand: "Times", category: "Sunglasses", gender: "Women", frame: "#c9a05a", lens: "Photosun", price: "৳ 1,300", tag: "Bestseller", tone: "#f3e6cf", accent: "#b9863f", shape: "cat" },
  { id: "e6", name: "Oversize", brand: "Times", category: "Sunglasses", gender: "Women", frame: "#1c1c1c", lens: "Blue Cut", price: "৳ 1,050", tag: "New", tone: "#e5e5e7", accent: "#3c5a8a", shape: "square" },
  { id: "e7", name: "DuraFlex", brand: "Times", category: "Eyeglasses", gender: "Men", frame: "#2f5fb0", lens: "Multi-Coated", price: "৳ 1,400", tag: "Hot", tone: "#dfe6f2", accent: "#2f5fb0", shape: "round" },
  { id: "e8", name: "Retro Double", brand: "Times", category: "Eyeglasses", gender: "Unisex", frame: "#8a5a2b", lens: "Blue Cut + Photosun", price: "৳ 1,600", compareAt: "৳ 1,900", tone: "#efe6d2", accent: "#a86a2a", shape: "round" },
  { id: "e9", name: "Titan Slim", brand: "Times", category: "Eyeglasses", gender: "Unisex", frame: "#c9a05a", lens: "Clear", price: "৳ 1,750", tag: "Premium", tone: "#efe8da", accent: "#b9863f", shape: "square" },
];

/* shop tabs: which pieces appear under each filter */
export const tabs = [
  { id: "new", label: "New Arrivals", match: (p: Piece) => p.tag === "New" || p.tag === "Premium" },
  { id: "best", label: "Best Sellers", match: (p: Piece) => p.tag === "Bestseller" },
  { id: "hot", label: "Most Ordered", match: (p: Piece) => p.tag === "Hot" },
];

/* ---------------- LENS CATALOG (page section) ------------- */
export type LensProduct = {
  id: string; name: string; tag: string; desc: string;
  features: string[]; base: string; tint: string; price: string;
};
export const lensProducts: LensProduct[] = [
  { id: "lp1", name: "Crystal White", tag: "Daily", desc: "Our clean everyday lens — clear, crisp, honest.", features: ["True clarity", "Anti-UV layer", "Comfort fit"], base: "linear-gradient(150deg,#f0f3f7,#e3e9ef)", tint: "rgba(220,240,255,0.2)", price: "৳ 399" },
  { id: "lp2", name: "Blue Cut", tag: "Screen", desc: "Built for phones, laptops and long shifts.", features: ["Filters blue light", "Anti-glare", "Less eye strain"], base: "linear-gradient(150deg,#dbe6f6,#c5d6ef)", tint: "rgba(47,95,176,0.4)", price: "৳ 650" },
  { id: "lp3", name: "Multi-Coated", tag: "Premium", desc: "Multi-layer AR coating for minimal reflection.", features: ["Anti-reflection", "Anti-scratch", "Anti-UV"], base: "linear-gradient(150deg,#d8e6ef,#c2d8e4)", tint: "rgba(60,110,170,0.28)", price: "৳ 750" },
  { id: "lp4", name: "White Photosun", tag: "Auto", desc: "Transitions from clear inside to tinted in sunlight.", features: ["Auto darkening", "Blocks UV", "2-in-1 pair"], base: "linear-gradient(150deg,#f3dfc2,#e6cba2)", tint: "rgba(168,106,42,0.4)", price: "৳ 850" },
  { id: "lp5", name: "Blue Cut + Photosun", tag: "All-rounder", desc: "Screen protection that doubles as sunglasses outdoors.", features: ["Blue light block", "Auto darkening", "Full-day wear"], base: "linear-gradient(150deg,#cbdcf2,#aec7e6)", tint: "rgba(47,75,140,0.5)", price: "৳ 950" },
  { id: "lp6", name: "Green Coated Blue Cut", tag: "Pro", desc: "Green AR coat + blue-cut core for low-glare contrast.", features: ["Green AR coating", "Blue-cut core", "Sharp contrast"], base: "linear-gradient(150deg,#d6e8da,#bfdcc7)", tint: "rgba(52,120,84,0.36)", price: "৳ 899" },
];

/* ---------------- WATCHES STRIP --------------------------- */
export const watches = {
  label: "Also on the shelf", title: "Watches for every wrist.",
  line: "From everyday steel to statement pieces — paired with your frame, sized on the spot.",
  items: ["Dress Steel", "Ladies Chain", "Sports Chrono"],
};

/* ---------------- WHY US ----------------------------------- */
export const pillars = [
  { stat: "100%", label: "Genuine fit & guidance", note: "In-store fitting, free prescription support." },
  { stat: "COD", label: "Cash on delivery", note: "Pay when it arrives, all over Bangladesh." },
  { stat: "48h", label: "Fast dispatch", note: "Most orders leave Gazipur same day." },
  { stat: "7-day", label: "Easy exchange", note: "Size or style not right? Swap it." },
];

export const story = {
  label: "The Store", title: ["Look sharp,", "see sharp."],
  body: "Times Eye is a trusted eyewear house in Gazipur, Dhaka. We stock a wide range of frames, premium lenses, and watches — and we fit everything properly, in store. School, work, or the weekend: we help you see better and look your part.",
  points: [
    { t: "Real guidance", d: "Talk lenses and fit with people who know, not a sales script." },
    { t: "Wide stock", d: "Frames for every face and budget, lenses for every need." },
    { t: "Honest pricing", d: "Clear marked prices with COD and easy exchange." },
  ],
};

/* ---------------- VISIT / CONTACT -------------------------- */
export const visit = {
  label: "Visit or message", title: ["Find your", "perfect pair."],
  details: [
    { label: "Location", value: brand.location },
    { label: "Hours", value: "Open daily · 10 AM – 10 PM" },
  ],
  waText: "Hi Times Eye! I'd like to order eyewear.",
};

export const marquee = [
  "Blue Cut", "Crystal White", "Multi-Coated", "White Photosun",
  "Blue Cut + Photosun", "Green Coated", "Polarized", "Watches",
];