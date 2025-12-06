import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Header, Footer } from "@/components";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LawBridge - AI Legal Assistant | Get Plain-Language Legal Answers",
  description:
    "LawBridge helps everyday people understand legal concepts with AI-powered, plain-language explanations backed by authoritative sources. Ask any legal question and get clear, cited answers.",
  keywords: [
    "legal assistant",
    "AI legal help",
    "legal questions",
    "tenant rights",
    "employment law",
    "legal advice",
    "plain language legal",
  ],
  authors: [{ name: "LawBridge Team" }],
  openGraph: {
    title: "LawBridge - AI Legal Assistant",
    description:
      "Get plain-language answers to your legal questions, backed by authoritative sources.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LawBridge - AI Legal Assistant",
    description:
      "Get plain-language answers to your legal questions, backed by authoritative sources.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LawBridge',
  applicationCategory: 'Legal Information',
  description: 'AI-powered legal assistant that provides plain-language answers to legal questions backed by authoritative sources.',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'LawBridge Team',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-[#0a0a0f]`}
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
