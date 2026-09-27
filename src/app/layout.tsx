import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://dsii.ng";
const SITE_DESCRIPTION =
  "Empowering, educating, and supporting disadvantaged individuals with focus on girl-child education, gender equality, climate justice, and combating violence. Based in Abuja, Nigeria.";

export const metadata: Metadata = {
  // Without metadataBase, Next emits relative og:image URLs and every link
  // preview (WhatsApp, X, LinkedIn, Slack) silently falls back to no image.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DSII - Deeds Support Initiative International | Abuja, Nigeria",
    template: "%s | DSII",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Deeds Support Initiative International",
  keywords: [
    "NGO Nigeria",
    "Abuja NGO",
    "girl-child education",
    "gender equality",
    "climate justice",
    "SGBV",
    "deaf community support",
    "menstrual hygiene",
    "health awareness Nigeria",
    "mental health Nigeria",
    "Deeds Support Initiative International",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Deeds Support Initiative International",
    description:
      "Building independent, confident futures through inclusive action.",
    url: SITE_URL,
    type: "website",
    locale: "en_NG",
    siteName: "Deeds Support Initiative International",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeds Support Initiative International",
    description:
      "Building independent, confident futures through inclusive action.",
    site: "@elladikecares",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Deeds Support Initiative International",
    alternateName: "DSII",
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/opengraph-image.png`,
    description: SITE_DESCRIPTION,
    foundingDate: "2020",
    founder: {
      "@type": "Person",
      name: "Dr. Emmanuella Dike",
      jobTitle: "Founder & Chief Executive Officer",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "170 Oladipo Diya Street, Durumi",
      addressLocality: "Abuja",
      addressRegion: "FCT",
      addressCountry: "NG",
    },
    email: "info@dsii.ng",
    telephone: "+2347030089631",
    sameAs: [
      "https://facebook.com/deedssupport",
      "https://twitter.com/elladikecares",
      "https://instagram.com/laladike",
      "https://linkedin.com/company/dsii",
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
