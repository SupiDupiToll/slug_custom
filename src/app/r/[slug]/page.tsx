

import { redirect } from "next/navigation";


'use client';
import React from "react";
import { useSearchParams } from "next/navigation";

function RickrollRedirect({ url }: { url: string }) {
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = url;
    }, 3000);
    return () => clearTimeout(timeout);
  }, [url]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
  <h2 className="text-2xl font-bold">Bitte warten...!</h2>
      <img src="https://media1.tenor.com/m/x8v1oNUOmg4AAAAd/rickroll-roll.gif" alt="Rickroll GIF" className="rounded-lg shadow-lg w-80 h-60 object-cover" />
  <p className="text-neutral-500">Du wirst gleich weitergeleitet...</p>
  <p className="text-neutral-500">...und du wurdest gerickrollt!</p>
    </div>
  );
}


const RickrollPage = ({ params }: { params: { slug: string } }) => {
  const targetUrl = `/${params.slug}`;
  return <RickrollRedirect url={targetUrl} />;
};

export default RickrollPage;
