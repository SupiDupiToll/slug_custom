

// ...existing code...
"use client";
import RickrollWithConsent from "@/components/RickrollWithConsent";
import React from "react";
// ...existing code...

// RickrollWithConsent übernimmt Banner, Timer und Redirect


const RickrollPage = ({ params }: { params: { slug: string } }) => {
  const targetUrl = `/${params.slug}`;
  return <RickrollWithConsent url={targetUrl} />;
};

export default RickrollPage;
