"use client";
import RickrollWithConsent from "@/components/RickrollWithConsent";
import React from "react";

const RickrollPage = ({ params }: { params: { slug: string } }) => {
  const targetUrl = `/${params.slug}`;
  return <RickrollWithConsent url={targetUrl} />;
};

export default RickrollPage;
