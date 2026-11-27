/* Leadership. Bios supplied by the client, lightly edited for grammar only. */

export type Person = { slug: string; name: string; role: string; bio: string; photo: string; linkedin?: string };

export const TEAM: Person[] = [
  {
    slug: "akinnola-ikudaisi",
    name: "Akinnola Ikudaisi",
    role: "Founder and Chief Executive Officer",
    bio: "A Professor of Business Management and an alumnus of the London School of Economics, with more than 15 years of experience across the private and public sectors. He also sits on the boards of several other companies.",
    photo: "/team/akinnola-ikudaisi.jpg",
  },
  {
    slug: "edward-chmara",
    name: "Edward Chmara",
    role: "Chief Operating Officer",
    bio: "A renowned town planner and Fellow of the Royal Town Planning Institute in Britain, with more than 30 years of experience around the world. He has worked extensively across many sectors, in both private and public practice.",
    photo: "/team/edward-chmara.jpg",
  },
  {
    slug: "christopher-obasiolu",
    name: "Christopher Obasiolu",
    role: "Chief Technical Officer",
    bio: "A seasoned businessman with more than 35 years of distinguished experience. He is a former Director-General of the Rivers State Water Services Regulatory Commission and Chairman of Fortune Crest Services Limited. He began his career at Shell BP and brings wide-ranging expertise to the board.",
    photo: "/team/christopher-obasiolu.jpg",
  },
  {
    slug: "salim-haddad",
    name: "Salim Haddad",
    role: "Chief Marketing Officer",
    bio: "A Lebanese engineer and construction expert with more than 30 years in building, instrumentation, and oil and gas. He understands the intricacies of business and of managing client relationships.",
    photo: "/team/salim-haddad.jpg",
  },
  {
    slug: "ebenezer-banjo",
    name: "Ebenezer Mobolaji Banjo",
    role: "Company Secretary",
    bio: "A first-class Architecture graduate of the University of Ilorin, with experience in architectural practice, project coordination and documentation, infrastructure development, sustainable cities and institutional growth. He brings strong organisational, administrative and communication skills, and a passion for coordinated, sustainable infrastructure delivery.",
    photo: "/team/ebenezer-banjo.jpg",
    linkedin: "https://www.linkedin.com/in/banjo-ebenezer-mobolaji-6219a0187",
  },
];
