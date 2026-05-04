"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkoutDay } from "@/lib/types";

interface WorkoutCardProps {
  workout: WorkoutDay;
  theme: "lautaro" | "rocio";
  defaultOpen?: boolean;
}

export function WorkoutCard({ workout, theme, defaultOpen = false }: WorkoutCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const accent = theme === "lautaro" ? "text-cyan-400" : "text-pink-400";
  const border = theme === "lautaro" ? "border-cyan-400/30" : "border-pink-400/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass rounded-xl border-2", border)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex-1">
          <div className={cn("text-xs font-bold uppercase tracking-wider mb-1", accent)}>
            📅 {workout.day}
          </div>
          <h3 className="font-bold text-lg flex items-center gap-2">
            <span>{workout.emoji}</span>
            <span>{workout.title}</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">{workout.focus}</p>
          <p className="text-xs text-gray-500 mt-1">⏱ {workout.duration}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {workout.warmup && workout.warmup.length > 0 && (
                <div>
                  <h4 className={cn("text-xs font-bold uppercase mb-2", accent)}>
                    🔥 Calentamiento
                  </h4>
                  <div className="space-y-1.5">
                    {workout.warmup.map((ex, i) => (
                      <div key={i} className="flex justify-between text-sm py-1.5 border-b border-white/5">
                        <span className="text-gray-300">{ex.name}</span>
                        <span className={cn("font-mono text-xs", accent)}>{ex.sets}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {workout.exercises.map((section, idx) => (
                <div key={idx}>
                  <h4 className={cn("text-xs font-bold uppercase mb-2", accent)}>
                    💪 {section.section}
                  </h4>
                  <div className="space-y-1.5">
                    {section.items.map((ex, i) => (
                      <div key={i} className="flex justify-between text-sm py-1.5 border-b border-white/5">
                        <span className="text-gray-300">{ex.name}</span>
                        {ex.sets && <span className={cn("font-mono text-xs", accent)}>{ex.sets}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {workout.notes && (
                <div className="text-xs text-gray-400 italic bg-white/5 p-3 rounded-lg">
                  💡 {workout.notes}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
