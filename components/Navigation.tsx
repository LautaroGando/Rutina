"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar, Dumbbell, UtensilsCrossed, ChartBar, CheckSquare, History } from "lucide-react";

interface NavigationProps {
  user: "lautaro" | "rocio";
}

export function Navigation({ user }: NavigationProps) {
  const pathname = usePathname();

  // Mobile bottom nav: 5 items prioritarios. Histórico va al final del 5to (Stats)
  // Actualización: hacemos lugar reduciendo padding para que entren 6
  const links = [
    { href: `/${user}`, label: "Hoy", icon: Calendar },
    { href: `/${user}/entrenamiento`, label: "Entreno", icon: Dumbbell },
    { href: `/${user}/alimentacion`, label: "Comidas", icon: UtensilsCrossed },
    { href: `/${user}/checklist`, label: "Hábitos", icon: CheckSquare },
    { href: `/${user}/historial`, label: "Días", icon: History },
    { href: `/${user}/seguimiento`, label: "Stats", icon: ChartBar },
  ];

  const isLautaro = user === "lautaro";
  const activeColor = isLautaro ? "text-cyan-400" : "text-pink-400";
  const activeIndicator = isLautaro ? "bg-cyan-400" : "bg-pink-400";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-bottom bg-[#0a0e27]/95 backdrop-blur-xl border-t border-white/5">
      <div className="max-w-md mx-auto flex justify-around items-center py-2 px-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link key={link.href} href={link.href} className="relative flex-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center justify-center py-2 gap-1 transition-colors",
                  isActive ? activeColor : "text-gray-500"
                )}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn("text-[10px]", isActive ? "font-semibold" : "")}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId={`nav-indicator-${user}`}
                    className={cn("absolute top-0 left-1/4 right-1/4 h-0.5 rounded-full", activeIndicator)}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
