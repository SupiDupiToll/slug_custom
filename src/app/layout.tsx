// keine 'use client' Direktive hier
import type { Metadata, Viewport } from "next";
import React, { useState, useEffect, useCallback } from "react";

// Styles:
import "@/styles/globals.css";
import { cn } from "@/utils";

// Providers:
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToasterComponent } from "@/components/providers/toaster";

// External scripts:

import Script from "next/script";
import AppClient from "@/components/AppClient";
import { Analytics } from "@vercel/analytics/next";

// Layout:
import Header from "@/components/layout/header";

// Fonts:
import localFont from "next/font/local";

const interVariable = localFont({
  variable: "--font-sans",
  src: "../fonts/InterVariable.woff2",
  weight: "100 900",
  display: "swap",
  preload: true,
});

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
  themeColor: "#171717",
};

// App layout:
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Client-Logik ausgelagert in AppClient

  return (
    <html lang="en">
      <body
        className={cn(
          `font-sans ${interVariable.variable} ${geistMonoVariable.variable} antialiased`,
          "bg-white dark:bg-neutral-900",
          "selection:bg-neutral-200 dark:selection:bg-neutral-700",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
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
