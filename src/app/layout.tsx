// keine 'use client' Direktive hier
import type { Metadata, Viewport } from "next";
import Script from "next/script";

// Styles:
import "@/styles/globals.css";
import { cn } from "@/utils";

// Providers:
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToasterComponent } from "@/components/providers/toaster";

// External scripts:

// ...existing code...
import AppClient from "@/components/AppClient";
import { Analytics } from "@vercel/analytics/next";

// Layout:
import Header from "@/components/layout/header";

// Fonts:
import localFont from "next/font/local";

const geistMonoVariable = localFont({
  variable: "--font-geist-mono",
  src: "../fonts/GeistMonoVF.woff2",
  weight: "100 900",
  display: "swap",
  preload: true,
});

// Metadata:
export const metadata: Metadata = {
  metadataBase: new URL("https://go.sdtoll.de"),
  title: {
    default: "go.sdtoll.de",
    template: "%s - go.sdtoll.de",
  },
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/images/logo_png.png",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      sizes: "any",
      url: "/images/logo_svg.svg",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/images/apple-touch-icon.png",
    },
  ],
  description: "go.sdtoll.de - URL shortener",
  openGraph: {
    title: "go.sdtoll.de",
    description: "go.sdtoll.de - URL shortener",
    url: "https://go.sdtoll.de",
    siteName: "go.sdtoll.de",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "go.sdtoll.de",
    card: "summary_large_image",
  },
};

// Viewport:
export const viewport: Viewport = {
  themeColor: "#101622",
};

// App layout:
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Client-Logik ausgelagert in AppClient

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="monetag" content="3d04e0fce33c0aa4e321819743b52574" />
        <link
          rel="stylesheet"
          href="https://googledonts.private.coffee/css2?family=Manrope:wght@400;500;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://googledonts.private.coffee/css2?family=Material+Symbols+Outlined:wght@100..700,0..1"
        />
        <link
          rel="stylesheet"
          href="https://googledonts.private.coffee/css2?family=Manrope:wght@400;500;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap"
        />
      </head>
      <body
        className={cn(
          `font-sans ${geistMonoVariable.variable} antialiased`,
          "bg-background-dark text-slate-100",
          "selection:bg-primary/30 selection:text-slate-100",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Header />
          {children}
          <ToasterComponent />
        </ThemeProvider>
        <Script
          src="https://5gvci.com/act/files/tag.min.js?z=11113313"
          async
          data-cfasync="false"
        />
        <Script id="ad-zone-11113316" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='11113316',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
        <Script id="ad-zone-11113318" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='11113318',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
        <AppClient />
        <Analytics />
      </body>
    </html>
  );
}
