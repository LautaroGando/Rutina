"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MealOption } from "@/lib/types";

interface MealCardProps {
  meal: MealOption;
  theme: "lautaro" | "rocio";
  index?: number;
}

export function MealCard({ meal, theme, index = 0 }: MealCardProps) {
  const accent = theme === "lautaro" ? "text-cyan-400" : "text-pink-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="glass rounded-xl p-4 cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">{meal.emoji}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1">{meal.name}</h4>
          <p className="text-xs text-gray-400 mb-2 leading-relaxed">{meal.description}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className={cn("px-2 py-0.5 rounded-full bg-white/5", accent)}>
              🔥 {meal.calories} kcal
            </span>
            {meal.protein !== undefined && (
              <span className={cn("px-2 py-0.5 rounded-full bg-white/5", accent)}>
                🥩 {meal.protein}g
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
