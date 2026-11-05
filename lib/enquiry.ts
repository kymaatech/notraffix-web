/* Shared enquiry schema — used by the form (client) and the API route (server). */
import { SOLUTIONS } from "./content";
import { KITS } from "./solar";

export const SERVICE_OPTIONS = [
  { slug: "solar-systems", title: "Solar signal systems" },
  ...SOLUTIONS.map((s) => ({ slug: s.slug, title: s.title })),
];
export const KIT_OPTIONS = KITS.map((k) => ({ slug: k.slug, title: `${k.name} (${k.type})` }));

export const ORG_TYPES = [
  "State or federal road authority",
  "Local government",
  "Construction contractor",
  "Estate, campus or developer",
  "Port, airport or logistics",
  "Other",
] as const;

export const SCALES = ["One junction", "2 to 10 junctions", "More than 10", "A work zone or event", "Not sure yet"] as const;
export const TIMELINES = ["As soon as possible", "Within 3 months", "3 to 12 months", "Just exploring"] as const;

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  orgType: string;
  services: string[];
  location: string;
  scale: string;
  timeline: string;
  kit?: string;
  message: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(e: Partial<Enquiry>): FieldErrors {
  const err: FieldErrors = {};
  if (!e.name || e.name.trim().length < 2) err.name = "Enter your full name.";
  if (!e.email || !EMAIL.test(e.email.trim())) err.email = "Enter an email address like name@company.com.";
  if (e.phone && !/^[+\d][\d\s()-]{6,}$/.test(e.phone.trim())) err.phone = "Enter a phone number with digits only, e.g. +234 803 000 0000.";
  if (!e.orgType) err.orgType = "Choose the option closest to your organisation.";
  if (!e.services || e.services.length === 0) err.services = "Choose at least one thing you need help with.";
  if (!e.location || e.location.trim().length < 2) err.location = "Tell us the city, road or junction.";
  if (!e.message || e.message.trim().length < 10) err.message = "Add a sentence or two about the site and the problem.";
  if (!e.consent) err.consent = "Tick this so we can reply to you.";
  return err;
}
