import type { MediaKey } from "./media";

export type Solution = {
  slug: string;
  title: string;
  short: string;
  heading: [string, string]; // two-tone: [ink, quiet]
  intro: string;
  image: MediaKey;
  gallery: [MediaKey, MediaKey];
  features: { title: string; text: string }[];
  specs: [string, string][];
  uses: string[];
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "signal-installation",
    title: "Signal installation",
    short: "Complete signalised junctions: LED heads, poles, controllers, detection and pedestrian crossings.",
    heading: ["Signals built", "to stay on."],
    intro:
      "We design and install complete signal installations, from a single school crossing to a multi-arm interchange. Every head and detector reports to one controller, with conflict monitoring and a safe fallback if anything fails.",
    image: "signalSky",
    gallery: ["signalMast", "pedSignal"],
    features: [
      { title: "LED signal heads", text: "High-brightness optics that stay readable in direct sun and draw little power." },
      { title: "Junction controllers", text: "All signal groups on one controller, with conflict monitoring and an all-red fallback." },
      { title: "Vehicle detection", text: "Loops, radar or video feed live demand into the timing plan." },
      { title: "Pedestrian crossings", text: "Push buttons, countdown timers and audible units for safe, accessible crossings." },
      { title: "Backup power", text: "Battery and solar options keep junctions running through grid outages." },
      { title: "Open protocols", text: "Controllers that also work with a road authority's own control software." },
    ],
    specs: [["Signal groups", "Up to 32 per controller"], ["Optics", "200 and 300 mm LED"], ["Detection", "Loop, radar or video"], ["Backup", "UPS, optional solar"], ["Comms", "Fibre, 4G/5G or radio"]],
    uses: ["Urban junctions", "Highway interchanges", "School crossings", "Estate and industrial access"],
  },
  {
    slug: "adaptive-control",
    title: "Adaptive control",
    short: "Signal timings that follow real demand across a junction, a corridor or a whole network.",
    heading: ["Timings that follow the traffic,", "not the clock."],
    intro:
      "Fixed timing plans can't keep up with a city that changes by the minute. Adaptive control measures demand on every approach and adjusts cycle length, green splits and offsets continuously, so neighbouring junctions move traffic in green waves.",
    image: "intersection",
    gallery: ["lagosRoad", "congestion"],
    features: [
      { title: "Cycle-by-cycle timing", text: "Green time moves to the approaches that need it, every cycle." },
      { title: "Green waves", text: "Junctions along a corridor coordinate so traffic moves through without stopping." },
      { title: "Incident plans", text: "Prepared strategies switch in when a lane closes or an event lets out." },
      { title: "Network view", text: "One live map of every junction's phase, queues and faults." },
    ],
    specs: [["Updates", "Every signal cycle"], ["Scale", "One junction to a whole city"], ["Fallback", "Local fixed-time plans"], ["Integration", "Open API, NTCIP"]],
    uses: ["City centres", "Arterial corridors", "Event venues", "Port and freight routes"],
  },
  {
    slug: "priority",
    title: "Bus and emergency priority",
    short: "Green time for BRT buses and ambulances, without breaking the rest of the network.",
    heading: ["Right of way for", "the vehicles that need it."],
    intro:
      "Buses running late get an extended green. Ambulances get a clear path through every junction ahead of them. Pedestrians get safe, predictable crossings. The network recovers within one cycle afterwards.",
    image: "lagosBridge",
    gallery: ["streetAerial", "officer"],
    features: [
      { title: "BRT and bus priority", text: "GPS-triggered green extensions for buses, weighted by how late they are." },
      { title: "Emergency pre-emption", text: "Route-based green corridors for fire, ambulance and police." },
      { title: "Pedestrian priority", text: "Demand-based walk phases and longer crossing times near schools and markets." },
      { title: "Freight windows", text: "Timed priority for heavy vehicles on logistics routes." },
    ],
    specs: [["Triggers", "GPS, RFID or optical"], ["Modes", "Extend, recall or pre-empt"], ["Recovery", "Within one cycle"], ["Logging", "Every request recorded"]],
    uses: ["BRT corridors", "Hospital routes", "School zones", "Logistics hubs"],
  },
  {
    slug: "monitoring",
    title: "Monitoring and data",
    short: "Live counts, faults and incident alerts from every junction, in one control room.",
    heading: ["Know about a fault", "before anyone calls."],
    intro:
      "Sensors count and classify traffic, measure speed and queues, and flag incidents. Lamp failures, controller faults and dropped connections are raised the moment they happen, and our team is dispatched automatically.",
    image: "controlPoster",
    gallery: ["wiring", "streetAerial"],
    features: [
      { title: "Counting and classification", text: "Volumes by lane and vehicle type, from okadas to articulated trucks." },
      { title: "Fault alerts", text: "Lamp, controller and power faults raised in seconds, day and night." },
      { title: "Incident detection", text: "Stopped vehicles and queues spilling back are flagged automatically." },
      { title: "Reports and API", text: "Monthly reports for authorities, and the raw data through an open API." },
    ],
    specs: [["Sensors", "Radar, video, loop, ANPR"], ["Latency", "Under 2 seconds"], ["Access", "Web, mobile and API"], ["Retention", "Configurable, years"]],
    uses: ["Network planning", "Road safety audits", "Fault management", "Policy reporting"],
  },
  {
    slug: "roadworks",
    title: "Roadworks signalling",
    short: "Portable signals, traffic management plans and permits for roadworks, construction and events.",
    heading: ["Roadworks that", "keep traffic moving."],
    intro:
      "Radio-linked portable signals go up in minutes with no cable between heads, and scale up to cabled systems for bigger sites. We prepare the traffic management plan and permits, set up on site, and monitor the lights remotely until the job is done.",
    image: "cones",
    gallery: ["crews", "signalRed"],
    features: [
      { title: "Portable radio signals", text: "Cable-free heads with the controller built in. Quick to set up and easy to move." },
      { title: "Cabled temporary systems", text: "For bigger sites with many signal groups on one controller." },
      { title: "Plans and permits", text: "Traffic management plans and authority approvals prepared for you." },
      { title: "Remote checks", text: "Battery, lamps and timings visible online, with alerts to our crew." },
    ],
    specs: [["Set-up", "Under 30 minutes a site"], ["Power", "Battery, solar or mains"], ["Link", "Fail-safe radio"], ["Terms", "Rent, lease or buy"]],
    uses: ["Road maintenance", "Construction access", "Bridge works", "Event traffic"],
  },
  {
    slug: "parking",
    title: "Parking guidance",
    short: "Space detection and signs that send drivers straight to a free bay.",
    heading: ["Less circling,", "more arriving."],
    intro:
      "Bay sensors and entry counts track every car park and kerbside zone. Signs at decision points and a live map guide drivers to free spaces, cutting the traffic made by people searching for a bay.",
    image: "parking",
    gallery: ["congestion", "lagosRoad"],
    features: [
      { title: "Occupancy detection", text: "Per-bay sensors or entry and exit counts for any car park." },
      { title: "Guidance signs", text: "LED signs showing live availability at every decision point." },
      { title: "Payment and access", text: "Pay stations, plate-recognition access and mobile payments." },
      { title: "Site dashboard", text: "Occupancy and revenue across every site in one place." },
    ],
    specs: [["Detection", "Bay sensor, count or ANPR"], ["Signs", "Full-colour LED"], ["Payments", "Card, transfer, permit"], ["Sites", "As many as you run"]],
    uses: ["City centres", "Airports", "Universities", "Malls and estates"],
  },
];

export const PROCESS: { title: string; text: string; image: MediaKey }[] = [
  { title: "Survey", text: "We count, film and model the junction to see where the time is actually lost.", image: "streetAerial" },
  { title: "Design", text: "Signal layout, phasing and timing plans, signed off with the road authority.", image: "wiring" },
  { title: "Install", text: "Civil works, cabling and commissioning, scheduled around traffic.", image: "crews" },
  { title: "Maintain", text: "Monitoring, regular re-timing and maintenance that keep the junction performing.", image: "controlPoster" },
];

/* PLACEHOLDER projects — replace with the client's real references before launch. */
export const PROJECTS: { name: string; place: string; scope: string; scale: string; year: string; image: MediaKey; summary: string }[] = [
  { name: "Roundabout signalisation", place: "Lagos", scope: "Signal installation", scale: "6 approaches", year: "2026", image: "heroPoster", summary: "Converting a congested roundabout to a signalised junction with pedestrian crossings on every arm." },
  { name: "Island corridor timing", place: "Lagos", scope: "Adaptive control", scale: "12 junctions", year: "2026", image: "lagosRoad", summary: "Coordinated green waves along a commercial corridor, with bus priority on the main approaches." },
  { name: "Bridge approach works", place: "Lagos", scope: "Roadworks signalling", scale: "3 km", year: "2025", image: "lagosBridge", summary: "Portable signals and traffic management through a phased rehabilitation of a bridge approach." },
];

export const FAQ = [
  { q: "Can you work with the signals already installed?", a: "Usually, yes. We audit what's on site and connect compatible controllers over open protocols. Equipment is only replaced where it's unsafe or can't be connected." },
  { q: "What happens during a power outage?", a: "Controllers run on battery backup, and solar is available. If a junction does lose power it goes to a safe state, and our control room is alerted straight away." },
  { q: "How fast can roadworks signals be set up?", a: "Portable radio signals usually take under 30 minutes a site once the traffic management plan is approved." },
  { q: "Do you handle permits and approvals?", a: "Yes. We prepare traffic management plans and work with the road authority on your behalf." },
  { q: "Can we rent instead of buying?", a: "Yes. Short-term rental, leases and outright purchase are all available." },
];

export const getSolution = (slug: string) => SOLUTIONS.find((s) => s.slug === slug);
