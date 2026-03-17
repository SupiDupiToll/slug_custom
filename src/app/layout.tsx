// keine 'use client' Direktive hier
import type { Metadata, Viewport } from "next";

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
        <link
          rel="stylesheet"
          href="https://googledonts.private.coffee/css2?family=Manrope:wght@400;500;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap"
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
        <AppClient />
        <Analytics />
      </body>
    </html>
  );
}
