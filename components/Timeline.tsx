"use client";

import { motion } from "framer-motion";
import type { TimelineItem } from "@/lib/types";

interface TimelineProps {
  items: TimelineItem[];
  theme: "lautaro" | "rocio";
}

export function Timeline({ items, theme }: TimelineProps) {
  const dotColor = theme === "lautaro" ? "bg-cyan-400" : "bg-pink-400";
  const lineColor = theme === "lautaro" ? "bg-cyan-400/20" : "bg-pink-400/20";
  const timeColor = theme === "lautaro" ? "text-cyan-400" : "text-pink-400";

  return (
    <div className="relative pl-8">
      {/* Línea vertical */}
      <div className={`absolute left-3 top-2 bottom-2 w-0.5 ${lineColor}`} />

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="relative"
          >
            {/* Punto */}
            <div className={`absolute -left-7 top-2 w-3 h-3 rounded-full ${dotColor} shadow-lg shadow-current ring-4 ring-[#1a1a2e]`} />

            {/* Contenido */}
            <div className="glass rounded-xl p-3">
              <div className={`text-xs font-bold ${timeColor} mb-1`}>
                {item.emoji} {item.time}
              </div>
              <div className="font-semibold text-sm mb-1">{item.title}</div>
              <div className="text-sm text-gray-300">{item.description}</div>
              {item.detail && (
                <div className="text-xs text-gray-500 mt-1.5 italic">{item.detail}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
