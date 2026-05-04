"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PersonSwitcherProps {
  current: "lautaro" | "rocio";
}

export function PersonSwitcher({ current }: PersonSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (person: "lautaro" | "rocio") => {
    if (person === current) return;
    const newPath = pathname.replace(/^\/(lautaro|rocio)/, `/${person}`);
    router.push(newPath);
  };

  // Inicial CONTRARIO al actual para que SIEMPRE anime al cargar
  const initialX = current === "lautaro" ? "100%" : "0%";
  const targetX = current === "lautaro" ? "0%" : "100%";

  return (
    <div className="relative mx-auto max-w-md p-2 rounded-full bg-[#0a0e27] border border-white/10 shadow-2xl">
      <div className="relative flex">
        {/* Indicador animado - SIEMPRE anima al cargar */}
        <motion.div
          key={current}
          initial={{ x: initialX, opacity: 0.5, scale: 0.95 }}
          animate={{ x: targetX, opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 24,
            opacity: { duration: 0.2 },
          }}
          className={cn(
            "absolute top-0 bottom-0 w-1/2 rounded-full",
            current === "lautaro" ? "gradient-lautaro" : "gradient-rocio"
          )}
        />

        {/* Botones */}
        <button
          onClick={() => switchTo("lautaro")}
          className={cn(
            "relative z-10 flex-1 py-3 px-4 rounded-full font-semibold transition-colors duration-300",
            current === "lautaro" ? "text-white" : "text-gray-400 hover:text-white"
          )}
        >
          💙 Tataro
        </button>

        <button
          onClick={() => switchTo("rocio")}
          className={cn(
            "relative z-10 flex-1 py-3 px-4 rounded-full font-semibold transition-colors duration-300",
            current === "rocio" ? "text-white" : "text-gray-400 hover:text-white"
          )}
        >
          💗 Ozio
        </button>
      </div>
    </div>
  );
}
