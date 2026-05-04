"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, Dumbbell, UtensilsCrossed, ChartBar, CheckSquare, History } from "lucide-react";
import { PersonSwitcher } from "./PersonSwitcher";

interface DesktopSidebarProps {
  user: "lautaro" | "rocio";
}

export function DesktopSidebar({ user }: DesktopSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: `/${user}`, label: "Hoy", icon: Calendar },
    { href: `/${user}/entrenamiento`, label: "Entrenamiento", icon: Dumbbell },
    { href: `/${user}/alimentacion`, label: "Alimentación", icon: UtensilsCrossed },
    { href: `/${user}/checklist`, label: "Hábitos", icon: CheckSquare },
    { href: `/${user}/historial`, label: "Histórico", icon: History },
    { href: `/${user}/seguimiento`, label: "Seguimiento", icon: ChartBar },
  ];

  const today = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const isLautaro = user === "lautaro";
  const accentText = isLautaro ? "text-cyan-400" : "text-pink-400";
  const activeBg = isLautaro ? "bg-cyan-400/10" : "bg-pink-400/10";

  return (
    <aside className="hidden md:flex flex-col w-72 lg:w-80 fixed top-0 left-0 bottom-0 bg-[#0a0e27]/95 backdrop-blur-xl border-r border-white/5 p-6 overflow-y-auto">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-1">
          <span className={isLautaro ? "text-gradient-lautaro" : "text-gradient-rocio"}>
            💪 Life OS
          </span>
        </h1>
        <p className="text-xs text-gray-400 capitalize">{today}</p>
      </motion.div>

      {/* Person switcher */}
      <div className="mb-8">
        <PersonSwitcher current={user} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link key={link.href} href={link.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative",
                  isActive
                    ? cn(activeBg, accentText, "font-semibold")
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId={`sidebar-indicator-${user}`}
                    className={cn(
                      "absolute left-0 top-2 bottom-2 w-1 rounded-r-full",
                      isLautaro ? "bg-cyan-400" : "bg-pink-400"
                    )}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <p className="text-xs text-gray-500 text-center">
          💪 Life OS · {user === "lautaro" ? "Tataro" : "Ozio"}
        </p>
      </div>
    </aside>
  );
}
