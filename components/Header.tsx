"use client";

import { motion } from "framer-motion";
import { PersonSwitcher } from "./PersonSwitcher";

interface HeaderProps {
  user: "lautaro" | "rocio";
}

export function Header({ user }: HeaderProps) {
  const today = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Solo se muestra en mobile (md:hidden)
  return (
    <header className="md:hidden sticky top-0 z-40 bg-[#1a1a2e]/90 backdrop-blur-xl border-b border-white/5">
      <div className="px-4 py-4 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-4"
        >
          <h1 className="text-2xl font-bold mb-1">
            <span className={user === "lautaro" ? "text-gradient-lautaro" : "text-gradient-rocio"}>
              💪 Life OS
            </span>
          </h1>
          <p className="text-xs text-gray-400 capitalize">{today}</p>
        </motion.div>

        <PersonSwitcher current={user} />
      </div>
    </header>
  );
}
