import React, { useState, useEffect } from "react";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { Spinner } from "@/ui/ui/spinner";

function TimeBar({
  onComplete,
  duration = 3000,
}: {
  onComplete: () => void;
  duration?: number;
}) {
  useEffect(() => {
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  return (
    <div className="flex items-center gap-4">
      <Spinner className="text-primary size-8" />
      <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-800">
        <div className="bg-primary/80 h-full w-full animate-pulse" />
      </div>
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
      <div className="relative flex min-h-[70vh] items-center justify-center px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-white/20"></div>
          <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-48 w-48 rounded-full bg-white/10"></div>
        </div>
        <div className="w-full max-w-lg rounded-xl border border-slate-800/50 bg-slate-900/40 p-8 text-center backdrop-blur">
          <p className="text-primary mb-3 text-sm font-bold uppercase tracking-widest">
            Redirect
          </p>
          <h2 className="font-display text-3xl font-black">
            Bitte warten<span className="text-primary italic">...</span>
          </h2>
          <img
            src="https://media1.tenor.com/m/x8v1oNUOmg4AAAAd/rickroll-roll.gif"
            alt="Rickroll GIF"
            className="mt-6 h-60 w-full rounded-lg object-cover shadow-lg"
          />
          <div className="mt-6 flex items-center justify-center">
            <TimeBar
              duration={2000}
              onComplete={() => (window.location.href = url)}
            />
          </div>
          <p className="mt-4 text-slate-400">
            Du wirst gleich weitergeleitet...
          </p>
          <p className="text-slate-500">...und du wurdest gerickrollt!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-white/20"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-48 w-48 rounded-full bg-white/10"></div>
      </div>
      {showBanner ? (
        <CookieConsentBanner
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      ) : (
        <div className="w-full max-w-lg rounded-xl border border-slate-800/50 bg-slate-900/40 p-8 text-center backdrop-blur">
          <p className="text-primary mb-3 text-sm font-bold uppercase tracking-widest">
            Redirect
          </p>
          <h2 className="font-display text-3xl font-black">
            Bitte warten<span className="text-primary italic">...</span>
          </h2>
          <img
            src="https://media1.tenor.com/m/x8v1oNUOmg4AAAAd/rickroll-roll.gif"
            alt="Rickroll GIF"
            className="mt-6 h-60 w-full rounded-lg object-cover shadow-lg"
          />
          <div className="mt-6 flex items-center justify-center">
            <TimeBar
              duration={3000}
              onComplete={() => (window.location.href = url)}
            />
          </div>
          <p className="mt-4 text-slate-400">
            Du wirst gleich weitergeleitet...
          </p>
          <p className="text-slate-500">...und du wurdest gerickrollt!</p>
        </div>
      )}
    </div>
  );
}
