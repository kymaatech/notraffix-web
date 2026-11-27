/* Solar junction systems — supplied with our technical partner.
   Specs are taken from the partner's design sheets. Partner name, model numbers
   and prices are deliberately left out; prices are quoted per project. */

export type JunctionType = "3-way" | "4-way";
export type HeadStyle = "ball" | "arrow" | "timer";
export type PoleStyle = "cantilever" | "post";

export type Kit = {
  slug: string;
  name: string;
  type: JunctionType;
  tagline: string;
  summary: string;
  head: HeadStyle;
  pole: PoleStyle;
  bestFor: string[];
  highlights: string[];
  items: { name: string; spec: string; qty: number }[];
  power: { panels: string; batteries: string; autonomy: string };
};

export const KITS: Kit[] = [
  {
    slug: "t-junction-standard",
    name: "T-Junction Standard",
    type: "3-way",
    tagline: "Full-ball signals on cantilever arms, with countdown timers.",
    summary:
      "The all-round system for a three-arm junction. Each approach gets a full-ball signal head on a 5 m arm over the lanes, a large countdown timer and pedestrian signals at every crossing.",
    head: "ball",
    pole: "cantilever",
    bestFor: ["Busy T-junctions", "Estate and campus gates", "Market roads"],
    highlights: ["Overhead signals visible from far back in the queue", "400 mm countdown on every approach", "Six pedestrian signals"],
    items: [
      { name: "Full-ball LED vehicle signal", spec: "300 mm, 96 LEDs per colour", qty: 6 },
      { name: "Countdown timer", spec: "400 × 400 mm, two-digit", qty: 3 },
      { name: "Pedestrian signal", spec: "300 mm, standing / walking figure", qty: 6 },
      { name: "Wireless junction controller", spec: "1 master + 2 slave units", qty: 1 },
      { name: "Solar panel", spec: "100 Wp, 24 V", qty: 6 },
      { name: "Solar charge controller", spec: "20 A", qty: 3 },
      { name: "Sealed gel battery", spec: "100 Ah", qty: 6 },
      { name: "Equipment cabinet", spec: "Two-tier, controller and batteries", qty: 3 },
      { name: "Cantilever signal pole", spec: "6.4 m pole, 5 m arm, galvanised", qty: 3 },
      { name: "Pedestrian pole", spec: "3 m, 89 mm", qty: 6 },
    ],
    power: { panels: "6 × 100 Wp", batteries: "6 × 100 Ah", autonomy: "Runs through cloudy days on battery" },
  },
  {
    slug: "t-junction-lane-control",
    name: "T-Junction Lane Control",
    type: "3-way",
    tagline: "Arrow signals that control each turning movement separately.",
    summary:
      "For T-junctions where right turns and straight-ahead traffic need their own green. Arrow signal heads give every movement its own phase, with countdown timers on the arm and the pole.",
    head: "arrow",
    pole: "cantilever",
    bestFor: ["Heavy turning traffic", "Multi-lane approaches", "Expressway slip roads"],
    highlights: ["Nine arrow signal heads, one per movement", "Two countdown sizes: overhead and at eye level", "Larger 150 Ah batteries"],
    items: [
      { name: "Arrow LED vehicle signal", spec: "300 mm, 90 LEDs per colour", qty: 9 },
      { name: "Countdown timer, overhead", spec: "400 × 400 mm", qty: 3 },
      { name: "Countdown timer, pole", spec: "300 × 300 mm", qty: 3 },
      { name: "Pedestrian signal", spec: "300 mm, standing / walking figure", qty: 6 },
      { name: "Wireless junction controller", spec: "1 master + 2 slave units", qty: 1 },
      { name: "Solar panel", spec: "120 Wp, 24 V", qty: 6 },
      { name: "Solar charge controller", spec: "20 A", qty: 3 },
      { name: "Sealed gel battery", spec: "150 Ah", qty: 6 },
      { name: "Equipment cabinet", spec: "Two-tier, controller and batteries", qty: 3 },
      { name: "Cantilever signal pole", spec: "6.4 m pole, 5 m arm, galvanised", qty: 3 },
      { name: "Pedestrian pole", spec: "3 m, 89 mm", qty: 6 },
    ],
    power: { panels: "6 × 120 Wp", batteries: "6 × 150 Ah", autonomy: "Our longest-running 3-way system on battery" },
  },
  {
    slug: "t-junction-countdown",
    name: "T-Junction Countdown",
    type: "3-way",
    tagline: "Signal heads with the countdown built into the face.",
    summary:
      "A cleaner arm: the countdown sits inside the signal head between red and green, so drivers read the colour and the seconds left in one glance. High-density optics with 264 LEDs per colour.",
    head: "timer",
    pole: "cantilever",
    bestFor: ["City-centre junctions", "Junctions with short sight lines", "Upgrades of old signals"],
    highlights: ["Countdown integrated into the head", "264-LED red and green for very high visibility", "Fewer parts on the arm"],
    items: [
      { name: "LED signal with integrated countdown", spec: "300 mm, 264 LEDs red / green", qty: 6 },
      { name: "Pedestrian signal", spec: "300 mm, standing / walking figure", qty: 6 },
      { name: "Wireless junction controller", spec: "1 master + 2 slave units", qty: 1 },
      { name: "Solar panel", spec: "100 Wp, 24 V", qty: 6 },
      { name: "Solar charge controller", spec: "20 A", qty: 3 },
      { name: "Sealed gel battery", spec: "100 Ah", qty: 6 },
      { name: "Equipment cabinet", spec: "Two-tier, controller and batteries", qty: 3 },
      { name: "Cantilever signal pole", spec: "6.4 m pole, 5 m arm, galvanised", qty: 3 },
      { name: "Pedestrian pole", spec: "3 m, 89 mm", qty: 3 },
    ],
    power: { panels: "6 × 100 Wp", batteries: "6 × 100 Ah", autonomy: "Runs through cloudy days on battery" },
  },
  {
    slug: "t-junction-compact",
    name: "T-Junction Compact",
    type: "3-way",
    tagline: "One straight pole per approach. Batteries buried out of sight.",
    summary:
      "The fastest system to install. A single 4 m pole per approach carries the solar panel, a signal head with built-in countdown and pedestrian signals. Batteries sit in an underground box, away from heat and theft.",
    head: "timer",
    pole: "post",
    bestFor: ["Narrow roads", "Temporary or phased schemes", "Low-budget first signals"],
    highlights: ["Smallest footprint, no overhead arm", "Underground battery box", "Installs in about a day per junction"],
    items: [
      { name: "LED signal with countdown", spec: "300 mm, 152 LEDs red / green", qty: 3 },
      { name: "Pedestrian signal", spec: "200 mm, standing / walking figure", qty: 6 },
      { name: "Wireless junction controller", spec: "1 master + 2 slave units", qty: 1 },
      { name: "Solar panel", spec: "150 Wp, 24 V", qty: 3 },
      { name: "Solar charge controller", spec: "20 A", qty: 3 },
      { name: "Sealed battery", spec: "100 Ah, 12 V", qty: 6 },
      { name: "Pole-mounted cabinet", spec: "Single-tier", qty: 3 },
      { name: "Signal pole", spec: "4 m, with anchor bolts", qty: 3 },
      { name: "Underground battery box", spec: "With ducting", qty: 3 },
    ],
    power: { panels: "3 × 150 Wp", batteries: "6 × 100 Ah", autonomy: "Batteries kept cool underground" },
  },
  {
    slug: "crossroad-standard",
    name: "Crossroad Standard",
    type: "4-way",
    tagline: "Full signalisation for a four-arm junction, on cantilever arms.",
    summary:
      "Our complete crossroad system. Overhead full-ball signals and countdowns on all four approaches, near-side signals at the stop line, and pedestrian signals on all eight crossing points.",
    head: "ball",
    pole: "cantilever",
    bestFor: ["Major crossroads", "Arterial roads", "Replacing hand control by wardens"],
    highlights: ["Eight vehicle signals, four countdowns", "Eight pedestrian signals", "Up to 12 vehicle phases"],
    items: [
      { name: "Full-ball LED vehicle signal", spec: "300 mm, 96 LEDs per colour", qty: 8 },
      { name: "Countdown timer", spec: "400 × 400 mm, two-digit", qty: 4 },
      { name: "Pedestrian signal", spec: "300 mm, standing / walking figure", qty: 8 },
      { name: "Wireless junction controller", spec: "1 master + 3 slave units", qty: 1 },
      { name: "Solar panel", spec: "100 Wp, 24 V", qty: 8 },
      { name: "Solar charge controller", spec: "20 A", qty: 4 },
      { name: "Sealed gel battery", spec: "100 Ah", qty: 8 },
      { name: "Equipment cabinet", spec: "Two-tier, controller and batteries", qty: 4 },
      { name: "Cantilever signal pole", spec: "6.4 m pole, 5 m arm, galvanised", qty: 4 },
      { name: "Pedestrian pole", spec: "3 m, 89 mm", qty: 8 },
    ],
    power: { panels: "8 × 100 Wp", batteries: "8 × 100 Ah", autonomy: "Runs through cloudy days on battery" },
  },
  {
    slug: "crossroad-compact",
    name: "Crossroad Compact",
    type: "4-way",
    tagline: "Four straight poles, integrated countdowns, batteries underground.",
    summary:
      "A crossroad system without overhead arms. Each corner gets a 4 m pole with its own solar panel, a signal head with built-in countdown and two pedestrian signals, with batteries buried at the base.",
    head: "timer",
    pole: "post",
    bestFor: ["Residential crossroads", "Roads with overhead cables", "Quick deployments"],
    highlights: ["No arms over the road", "Underground battery boxes", "Four poles, one per corner"],
    items: [
      { name: "LED signal with countdown", spec: "300 mm, 152 LEDs red / green", qty: 4 },
      { name: "Pedestrian signal", spec: "200 mm, standing / walking figure", qty: 8 },
      { name: "Wireless junction controller", spec: "1 master + 3 slave units", qty: 1 },
      { name: "Solar panel", spec: "150 Wp, 24 V", qty: 4 },
      { name: "Solar charge controller", spec: "20 A", qty: 4 },
      { name: "Sealed battery", spec: "100 Ah, 12 V", qty: 8 },
      { name: "Pole-mounted cabinet", spec: "Single-tier", qty: 4 },
      { name: "Signal pole", spec: "4 m, with anchor bolts", qty: 4 },
      { name: "Underground battery box", spec: "With ducting", qty: 4 },
    ],
    power: { panels: "4 × 150 Wp", batteries: "8 × 100 Ah", autonomy: "Batteries kept cool underground" },
  },
];

/* Shared component specifications. */
export const COMPONENTS: { key: "ball" | "arrow" | "timer" | "countdown" | "ped" | "controller"; name: string; text: string; specs: [string, string][] }[] = [
  {
    key: "ball",
    name: "Full-ball LED signal",
    text: "Three 300 mm aspects packed with high-brightness LEDs, readable in direct sun and through rain.",
    specs: [["Diameter", "300 mm"], ["LED life", "50,000+ hours"], ["Average power", "1.8 W"], ["Supply", "24 V DC"], ["Protection", "IP54"]],
  },
  {
    key: "arrow",
    name: "Arrow signal",
    text: "Directional red, amber and green arrows so each turning movement can run its own phase.",
    specs: [["Diameter", "300 mm"], ["LEDs", "90 per colour"], ["Average power", "1.7 W"], ["Supply", "24 V DC"], ["Protection", "IP54"]],
  },
  {
    key: "timer",
    name: "Signal with countdown",
    text: "The seconds remaining are built into the head, so drivers read colour and time together.",
    specs: [["Diameter", "300 mm"], ["LEDs", "Up to 264 per colour"], ["Average power", "2.6–4.2 W"], ["Supply", "24 V DC"], ["Protection", "IP54"]],
  },
  {
    key: "countdown",
    name: "Countdown timer",
    text: "Large two-digit display that learns the cycle from the signal and counts down every phase.",
    specs: [["Size", "300 or 400 mm"], ["Digit height", "255 mm"], ["Average power", "0.6–2.3 W"], ["Supply", "24 V DC"], ["Protection", "IP54"]],
  },
  {
    key: "ped",
    name: "Pedestrian signal",
    text: "Standing red and walking green figures, with push buttons wired to the controller's pedestrian plan.",
    specs: [["Size", "200 or 300 mm"], ["LEDs", "77 red / 125 green"], ["Average power", "2.05 W"], ["Supply", "24 V DC"], ["Protection", "IP54"]],
  },
  {
    key: "controller",
    name: "Wireless junction controller",
    text: "A master unit and a slave on each pole talk over dual-band radio, so there is no cable trenched across the junction.",
    specs: [["Vehicle phases", "Up to 12 (36 outputs)"], ["Pedestrian phases", "Up to 4 (16 outputs)"], ["Standby power", "Under 0.8 W"], ["Output", "3 A per channel"], ["Time sync", "GPS"]],
  },
];

export const CONTROLLER_FEATURES = [
  { title: "No cable across the road", text: "Master and slave units link over dual-band radio built to resist interference." },
  { title: "18 timing plans", text: "Store up to 18 plans and switch between them automatically through the day." },
  { title: "Weekday, weekend and special days", text: "Each day type splits into 24 time bands. Up to 20 special days, such as public holidays or market days." },
  { title: "Safe on fault", text: "If anything fails, every signal goes to flashing amber instead of conflicting greens." },
  { title: "Wiring-safe", text: "Reverse-polarity protection, so a wrongly connected battery can't damage the controller." },
  { title: "Remote override", text: "A handheld remote can set all-red, step to the next phase or hold the current phase for 120 seconds." },
  { title: "Pedestrian push buttons", text: "Master and slaves all accept push buttons that call the pedestrian plan." },
  { title: "GPS-synced clock", text: "Plans change at exactly the right time, every day, without drift." },
];

export const SHARED_SPECS: [string, string][] = [
  ["LED lifetime", "50,000+ hours"],
  ["Operating temperature", "−40 °C to 80 °C (signals)"],
  ["Humidity", "Up to 95%"],
  ["Ingress protection", "IP54"],
  ["System voltage", "12 / 24 V DC"],
  ["Equipment warranty", "2 years"], // partner terms — confirm with client before launch
];

export const kitsByType = (t: JunctionType) => KITS.filter((k) => k.type === t);
export const getKit = (slug: string) => KITS.find((k) => k.slug === slug);
