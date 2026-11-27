import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { BackToTop } from "@/components/BackToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TEAM } from "@/lib/team";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Intelligent traffic systems for Nigeria and Africa`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  openGraph: { title: SITE.name, description: SITE.description, type: "website", siteName: SITE.name, images: ["/media/hero-roundabout.jpg"] },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description, images: ["/media/hero-roundabout.jpg"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#15171B", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <script
          type="application/ld+json"
          // structured data so search engines show the business correctly
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
              logo: `${SITE.url}/email/mark.png`,
              email: SITE.email,
              telephone: SITE.phone,
              foundingDate: String(SITE.founded),
              parentOrganization: { "@type": "Organization", name: SITE.parent },
              address: {
                "@type": "PostalAddress",
                streetAddress: SITE.address.street,
                addressLocality: `${SITE.address.area}, ${SITE.address.city}`,
                addressRegion: SITE.address.state,
                addressCountry: "NG",
              },
              areaServed: ["Nigeria", "Africa"],
              employee: TEAM.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role })),
            }),
          }}
        />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
