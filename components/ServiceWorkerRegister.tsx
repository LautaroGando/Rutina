"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("✅ Service Worker registrado:", reg.scope);
          })
          .catch((err) => {
            console.warn("⚠️ Service Worker error:", err);
          });
      });
    }
  }, []);

  return null;
}
