"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    setIsIOS(ios);

    // Si está en standalone (ya instalada), no mostrar nada
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && (window.navigator as { standalone?: boolean }).standalone);
    if (isStandalone) return;

    // Verificar si ya fue cerrado en esta sesión
    if (sessionStorage.getItem("installPromptDismissed") === "true") return;

    // iOS no soporta beforeinstallprompt - mostrar instrucciones manuales
    if (ios) {
      setTimeout(() => setShowPrompt(true), 3000);
      return;
    }

    // Android/Desktop - escuchar evento
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("installPromptDismissed", "true");
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50"
        >
          <div className="glass rounded-2xl p-4 border border-white/10 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm mb-1">Instalar Life OS</h3>
                {isIOS ? (
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Tocá <strong>Compartir</strong> 􀈂 y luego <strong>"Agregar a inicio"</strong> para instalar la app.
                  </p>
                ) : (
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Instalá la app en tu celular para acceso rápido.
                  </p>
                )}
                {!isIOS && (
                  <button
                    onClick={handleInstall}
                    className="mt-3 px-4 py-2 rounded-lg gradient-lautaro text-white text-sm font-semibold hover:scale-105 transition-transform"
                  >
                    Instalar
                  </button>
                )}
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
