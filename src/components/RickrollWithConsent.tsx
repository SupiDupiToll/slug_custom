import React, { useState, useEffect } from "react";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { Spinner } from "@/ui/ui/spinner";


function TimeBar({ onComplete, duration = 3000 }: { onComplete: () => void; duration?: number }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-8" />
    </div>
  );
}


export default function RickrollWithConsent({ url }: { url: string }) {
  const [consent, setConsent] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [declined, setDeclined] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (stored === "accepted") {
      setConsent(true);
    } else if (stored === "declined") {
      setConsent(false);
      setDeclined(true);
    } else {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setConsent(false);
    setShowBanner(false);
    setDeclined(true);
  };

  if (declined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Bitte warten...!</h2>
        <img src="https://media1.tenor.com/m/x8v1oNUOmg4AAAAd/rickroll-roll.gif" alt="Rickroll GIF" className="rounded-lg shadow-lg w-80 h-60 object-cover" />
  <TimeBar duration={2000} onComplete={() => (window.location.href = url)} />
        <p className="text-neutral-500">Du wirst gleich weitergeleitet...</p>
        <p className="text-neutral-500">...und du wurdest gerickrollt!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      {showBanner ? (
        <CookieConsentBanner onAccept={handleAccept} onDecline={handleDecline} />
      ) : (
        <>
          <h2 className="text-2xl font-bold">Bitte warten...!</h2>
          <img src="https://media1.tenor.com/m/x8v1oNUOmg4AAAAd/rickroll-roll.gif" alt="Rickroll GIF" className="rounded-lg shadow-lg w-80 h-60 object-cover" />
          <TimeBar duration={3000} onComplete={() => (window.location.href = url)} />
          <p className="text-neutral-500">Du wirst gleich weitergeleitet...</p>
          <p className="text-neutral-500">...und du wurdest gerickrollt!</p>
        </>
      )}
    </div>
  );
}
