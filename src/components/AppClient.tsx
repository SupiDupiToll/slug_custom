"use client";
import React, { useState, useEffect, useCallback } from "react";
import Script from "next/script";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { Analytics } from "@vercel/analytics/next";

export default function AppClient() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookie_consent");
      if (consent === "accepted") setAllowed(true);
    }
  }, []);

  const handleCookieAccept = useCallback(() => {
    setAllowed(true);
  }, []);

  return (
    <>
      <CookieConsentBanner onAccept={handleCookieAccept} />
      {allowed && (
        <>
          <Script
            async
            src="https://cloud.umami.is/script.js"
            data-website-id="79fcf8e3-6782-4a88-b1b6-f048875b7df1"
          />
          <Analytics />
        </>
      )}
    </>
  );
}
