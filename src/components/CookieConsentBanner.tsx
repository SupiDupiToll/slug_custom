import React, { useEffect, useState } from "react";

const UMAMI_PRIVACY_URL = "https://umami.is/privacy";
// ...existing code...
const VERCEL_PRIVACY_URL = "https://vercel.com/legal/privacy-policy";

export default function CookieConsentBanner({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline?: () => void;
}) {
  const [visible, setVisible] = useState(false);
  // ...existing code...

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    // ...existing code...
    setVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    // ...existing code...
    setVisible(false);
    if (onDecline) onDecline();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl border border-slate-800/50 bg-slate-900/40 p-6 text-center text-slate-100 shadow-lg backdrop-blur">
        <h2 className="mb-2 text-lg font-semibold">Magst du Cookies?</h2>
        <p className="mb-4 text-sm text-slate-400">
          Diese Seite verwendet <b>Umami</b> und <b>Vercel Analytics</b>, um
          Nutzungsstatistiken zu erfassen. Mehr Infos findest du in der{" "}
          <a
            href={UMAMI_PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Umami Datenschutzerklärung
          </a>{" "}
          und der{" "}
          <a
            href={VERCEL_PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Vercel Datenschutzerklärung
          </a>
          .
        </p>
        <span
          className="cursor-pointer text-sm text-slate-500 underline hover:text-slate-300"
          onClick={handleDecline}
        >
          Ablehnen
        </span>
        <div className="flex items-center justify-center gap-4">
          <button
            className="bg-primary text-background-dark hover:shadow-primary/20 focus:ring-primary/40 inline-flex h-12 items-center justify-center rounded-full px-7 text-base font-bold transition-all hover:shadow-lg focus:outline-none focus:ring-2"
            onClick={handleAccept}
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
