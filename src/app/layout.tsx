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

export const metadata: Metadata = {
  title: "DSII - Deeds Support Initiative International | Abuja, Nigeria",
  description: "Empowering, educating, and supporting disadvantaged individuals with focus on girl-child education, gender equality, climate justice, and combating violence. Based in Abuja, Nigeria.",
  keywords: "NGO, Nigeria, Abuja, girl-child education, gender equality, climate justice, SGBV, deaf community support, menstrual hygiene",
  openGraph: {
    title: "Deeds Support Initiative International",
    description: "Building independent, confident futures through inclusive action",
    type: "website",
    locale: "en_NG",
    siteName: "DSII",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
