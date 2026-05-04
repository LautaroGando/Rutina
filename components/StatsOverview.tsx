"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { UserStats } from "@/lib/types";

interface StatsOverviewProps {
  stats: UserStats;
  theme: "lautaro" | "rocio";
}

export function StatsOverview({ stats, theme }: StatsOverviewProps) {
  const accent = theme === "lautaro" ? "text-cyan-400" : "text-pink-400";

  const statItems = [
    stats.weight && { value: `${stats.weight} kg`, label: "Peso" },
    stats.height && { value: `${stats.height} m`, label: "Altura" },
    stats.bmi && { value: stats.bmi, label: "IMC" },
    { value: stats.caloriesGoal, label: "kcal/día" },
    { value: `${stats.proteinGoal}g`, label: "Proteína" },
    stats.weeklyGoal && { value: "📈", label: stats.weeklyGoal },
  ].filter(Boolean) as { value: string | number; label: string }[];

  return (
    <div className="grid grid-cols-2 gap-3">
      {statItems.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="glass rounded-xl p-4 text-center"
        >
          <div className={cn("text-xl font-bold mb-1", accent)}>{item.value}</div>
          <div className="text-xs text-gray-400">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
