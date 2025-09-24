import React, { useEffect, useState } from "react";

const UMAMI_PRIVACY_URL = "https://umami.is/privacy";
// ...existing code...
const VERCEL_PRIVACY_URL = "https://vercel.com/legal/privacy-policy";

export default function CookieConsentBanner({ onAccept, onDecline }: { onAccept: () => void; onDecline?: () => void }) {
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
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-6 max-w-md w-full text-center border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-lg font-semibold mb-2">Magst du Cookies?</h2>
        <p className="mb-4 text-sm text-neutral-700 dark:text-neutral-300">
          Diese Seite verwendet <b>Umami</b> und <b>Vercel Analytics</b>, um anonyme Nutzungsstatistiken zu erfassen. Erst nach deiner Zustimmung wird das Tracking aktiviert. Mehr Infos findest du in der <a href={UMAMI_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="underline">Umami Datenschutzerklärung</a> und der <a href={VERCEL_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="underline">Vercel Datenschutzerklärung</a>.
        </p>
        <span
            className="cursor-pointer text-neutral-500 text-sm underline hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            onClick={handleDecline}
          >
            Ablehnen
          </span>
        <div className="flex gap-4 justify-center items-center">
          <button
            className="px-7 py-2 rounded bg-neutral-900 text-white text-base font-bold hover:bg-neutral-800 transition shadow border-2 border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
            onClick={handleAccept}
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
