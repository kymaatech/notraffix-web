/* Brand + contact details (confirmed by the client, Nov 2026). */
export const SITE = {
  name: "Notraffix",
  legal: "Siloe Limited",
  parent: "Siloe Limited",
  tagline: "Intelligent traffic systems",
  description:
    "Notraffix designs, installs and maintains traffic signals, adaptive control, solar signal systems and traffic-management technology for governments, road authorities, contractors and campuses across Nigeria and Africa.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://notraffix.com",
  email: "info@notraffix.com",
  phone: "+234 708 664 4830",
  whatsapp: "2347086644830", // international format, no +
  address: {
    street: "2 Bonny Close, Nembe Street",
    area: "Rumuibekwe",
    city: "Port Harcourt",
    state: "Rivers State",
    country: "Nigeria",
  },
  city: "Port Harcourt, Rivers State",
  hours: "8am to 5pm, every day",
  replyTime: "within two working days",
  founded: 2026,
  credit: { label: "Kymaa", href: "https://kymaa.tech" },
};

export const NAV = [
  { href: "/solutions", label: "Solutions" },
  { href: "/solar", label: "Solar systems" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "Company" },
];

export const tel = (s: string) => `tel:${s.replace(/[^\d+]/g, "")}`;
export const whatsappLink = (text = "Hello Notraffix, I'd like to ask about a traffic project.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
export const fullAddress = () => `${SITE.address.street}, ${SITE.address.area}, ${SITE.address.city}, ${SITE.address.state}`;
