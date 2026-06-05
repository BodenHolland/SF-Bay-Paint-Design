import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getSiteUrl } from "@/lib/site-url";

const grotesk = Schibsted_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const description =
  "Painting and turnovers for Bay Area property portfolios. Interior and exterior work for property managers, landlords, and building owners across the SF Bay Area.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default:
      "SF Bay Paint & Design · Property painting & unit turnovers · SF Bay Area",
    template: "%s · SF Bay Paint & Design",
  },
  description,
  applicationName: "SF Bay Paint & Design",
  authors: [{ name: "Leslie Burnley" }],
  creator: "Leslie Burnley",
  publisher: "SF Bay Paint & Design",
  category: "construction",
  keywords: [
    "Bay Area painting contractor",
    "property management painting",
    "rental unit turnover",
    "commercial painting San Francisco",
    "multi-family painting",
    "exterior painting Bay Area",
    "SF Bay Paint & Design",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "SF Bay Paint & Design",
    description,
    type: "website",
    siteName: "SF Bay Paint & Design",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "SF Bay Paint & Design",
    description,
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll />
        <ViewTransition>{children}</ViewTransition>
      </body>
    </html>
  );
}
