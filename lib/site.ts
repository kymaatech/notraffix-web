/* Brand + contact details. Everything marked PLACEHOLDER waits on the client. */
export const SITE = {
  name: "Notraffix",
  legal: "Notraffix Limited", // PLACEHOLDER — confirm registered name
  tagline: "Traffic signal systems",
  description:
    "Notraffix designs, installs and runs traffic signals, adaptive control and roadworks signalling for road authorities, contractors and campuses across Nigeria.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://notraffix.com",
  email: "support@notraffix.com",
  phone: "+234 000 000 0000", // PLACEHOLDER
  faultLine: "+234 000 000 0001", // PLACEHOLDER
  city: "Lagos, Nigeria", // PLACEHOLDER
  hours: "Monday to Friday, 8am to 6pm. Fault line open 24/7.",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "X", href: "https://x.com" },
  ],
  credit: { label: "Kymaa", href: "https://kymaa.tech" },
};

export const NAV = [
  { href: "/solutions", label: "Solutions" },
  { href: "/solar", label: "Solar systems" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "Company" },
];
