/* Every photo and video on the site, in one place.
   Stand-ins are free-licence Pexels media (no attribution required).
   Swap any entry for the client's own footage: drop the file in
   /public/media with the same name, or change `src`.
   `scripts/fetch-media.mjs` downloads anything missing on `npm run dev` / `build`. */

const px = (id: number, w = 2000) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export type MediaItem = { file: string; src: string; alt: string };

export const MEDIA = {
  // ── video ───────────────────────────────────────────────
  heroVideo: { file: "hero-roundabout-lite.mp4", src: "https://videos.pexels.com/video-files/28925676/12518918_1280_720_30fps.mp4", alt: "" },
  heroPoster: { file: "hero-roundabout.jpg", src: "https://images.pexels.com/videos/28925676/africa-african-city-buildings-busy-intersection-28925676.jpeg?auto=compress&w=1920", alt: "Aerial view of a busy roundabout in a Nigerian city" },
  controlVideo: { file: "control-room-720.mp4", src: "https://videos.pexels.com/video-files/38779100/16477681_1280_720_25fps.mp4", alt: "" },
  controlPoster: { file: "control-room.jpg", src: "https://images.pexels.com/videos/38779100/auckland-big-screen-cctv-cctv-feed-38779100.jpeg?auto=compress&w=1920", alt: "Operators in a traffic management control room with a wall of camera feeds" },
  nightVideo: { file: "night-signal.mp4", src: "https://videos.pexels.com/video-files/38004389/16128687_1280_720_30fps.mp4", alt: "" },
  nightPoster: { file: "night-signal.jpg", src: "https://images.pexels.com/videos/38004389/pexels-photo-38004389.jpeg?auto=compress&w=1600", alt: "Cars waiting at a red signal at night" },

  // ── photographs ─────────────────────────────────────────
  signalRed: { file: "signal-red.jpg", src: px(14866056), alt: "Close-up of a traffic signal showing red" },
  signalSky: { file: "signal-sky.jpg", src: px(7007930), alt: "Traffic signal heads against a clear sky" },
  signalMast: { file: "signal-mast.jpg", src: px(8282820), alt: "Signal head on a mast arm over the road" },
  pedSignal: { file: "ped-signal.jpg", src: px(12274221), alt: "Pedestrian signal mounted on a pole" },
  engineer: { file: "engineer-cabinet.jpg", src: px(34526423), alt: "Engineer working on a signal control cabinet" },
  wiring: { file: "engineer-wiring.jpg", src: px(8985702), alt: "Technician wiring controller equipment" },
  cones: { file: "work-zone-cones.jpg", src: px(14823463), alt: "Traffic cones closing a lane for roadworks" },
  crews: { file: "road-crew.jpg", src: px(15063590), alt: "Road crew working on a construction site" },
  congestion: { file: "night-congestion.jpg", src: px(23957127), alt: "Congested traffic with brake lights at night" },
  streetAerial: { file: "street-aerial.jpg", src: px(11456309), alt: "Aerial view of a busy street and crossing" },
  officer: { file: "traffic-officer.jpg", src: px(27349704), alt: "Traffic officer directing vehicles at a junction" },
  parking: { file: "parking-aerial.jpg", src: px(5231181), alt: "Aerial view of a car park" },
  lagosRoad: { file: "lagos-road.jpg", src: "https://images.pexels.com/videos/29103994/africa-apartments-blue-sky-buildings-29103994.jpeg?auto=compress&w=1920", alt: "Aerial view of a busy road in Lagos" },
  lagosBridge: { file: "lagos-bridge.jpg", src: "https://images.pexels.com/videos/30227326/4k-drone-shot-africa-africa-travel-african-30227326.jpeg?auto=compress&w=1920", alt: "Aerial view of a bridge over the lagoon in Lagos" },
  solarInstaller: { file: "solar-installer.jpg", src: px(30285845), alt: "Technician in a hi-vis vest installing a solar panel" },
  solarPanels: { file: "solar-panels-sky.jpg", src: px(27873610), alt: "Solar panels angled towards the sky" },
  solarCells: { file: "solar-cells.jpg", src: px(8853509), alt: "Close-up of solar cells" },
  intersection: { file: "intersection-aerial.jpg", src: "https://images.pexels.com/videos/32521835/pexels-photo-32521835.jpeg?auto=compress&w=1920", alt: "Top-down view of a signalised intersection" },
} satisfies Record<string, MediaItem>;

export type MediaKey = keyof typeof MEDIA;
export const m = (k: MediaKey) => `/media/${MEDIA[k].file}`;
export const alt = (k: MediaKey) => MEDIA[k].alt;
