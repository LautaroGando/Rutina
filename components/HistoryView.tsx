"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface HistoryItem {
  itemKey: string;
  itemLabel: string;
  category: string;
  completed: boolean;
  completedAt: string | null;
}

interface HistoryDay {
  date: string;
  items: HistoryItem[];
  total: number;
  completed: number;
}

interface HistoryViewProps {
  user: "lautaro" | "rocio";
}

const categoryLabels: Record<string, { emoji: string; label: string }> = {
  morning: { emoji: "🌅", label: "Mañana" },
  training: { emoji: "💪", label: "Entrenamiento" },
  nutrition: { emoji: "🍽️", label: "Nutrición" },
  post_work: { emoji: "🚆", label: "Post-Trabajo" },
  night: { emoji: "🌙", label: "Noche" },
  goals: { emoji: "🎯", label: "Objetivos" },
};

export function HistoryView({ user }: HistoryViewProps) {
  const [history, setHistory] = useState<HistoryDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [range, setRange] = useState<7 | 30 | 90>(30);

  useEffect(() => {
    fetch(`/api/history?user=${user}&days=${range}`)
      .then((r) => r.json())
      .then((data) => {
        setHistory(data.history || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [user, range]);

  const accent = user === "lautaro" ? "text-cyan-400" : "text-pink-400";
  const accentBg = user === "lautaro" ? "gradient-lautaro" : "gradient-rocio";

  const formatDate = (dateStr: string) => {
    // dateStr es YYYY-MM-DD - parseamos como UTC para evitar conversiones
    const d = new Date(dateStr + "T12:00:00Z");
    return d.toLocaleDateString("es-AR", {
      timeZone: "UTC",
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const isToday = (dateStr: string) => {
    // Comparar con la fecha argentina actual
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Argentina/Buenos_Aires",
    });
    return dateStr === today;
  };

  const getCompletionRate = (day: HistoryDay) =>
    day.total > 0 ? Math.round((day.completed / day.total) * 100) : 0;

  const getRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-400";
    if (rate >= 60) return "text-yellow-400";
    if (rate >= 40) return "text-orange-400";
    return "text-red-400";
  };

  // Stats globales del rango
  let totalCompleted = 0;
  let totalActions = 0;
  for (const d of history) {
    totalCompleted += d.completed;
    totalActions += d.total;
  }
  const avgRate = totalActions > 0 ? Math.round((totalCompleted / totalActions) * 100) : 0;
  const activeDays = history.length;

  if (loading) {
    return (
      <div className="glass rounded-xl p-8 text-center text-gray-400 text-sm">
        Cargando histórico...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selector de rango */}
      <div className="flex gap-2">
        {([7, 30, 90] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-semibold transition-all",
              range === r
                ? cn(accentBg, "text-white shadow-lg")
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            {r} días
          </button>
        ))}
      </div>

      {/* Stats del rango */}
      {history.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          <div className="glass rounded-xl p-3 text-center">
            <div className={cn("text-2xl font-bold", accent)}>{activeDays}</div>
            <div className="text-xs text-gray-400">Días activos</div>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <div className={cn("text-2xl font-bold", accent)}>{totalCompleted}</div>
            <div className="text-xs text-gray-400">Hábitos ✅</div>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <div className={cn("text-2xl font-bold", getRateColor(avgRate))}>{avgRate}%</div>
            <div className="text-xs text-gray-400">Cumplimiento</div>
          </div>
        </div>
      )}

      {/* Lista de días */}
      {history.length === 0 ? (
        <div className="glass rounded-xl p-8 text-center">
          <Calendar className="w-10 h-10 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">
            Sin historial todavía. Empezá marcando hábitos hoy.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((day) => {
            const rate = getCompletionRate(day);
            const isOpen = expanded === day.date;

            // Solo mostrar items que el usuario marcó como completed (los pendientes no se muestran)
            const completedItems = day.items.filter((i) => i.completed);

            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : day.date)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm capitalize">
                        {formatDate(day.date)}
                      </span>
                      {isToday(day.date) && (
                        <span className={cn("text-xs px-2 py-0.5 rounded-full bg-white/10", accent)}>
                          Hoy
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[180px]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${rate}%` }}
                          className={cn("h-full rounded-full", accentBg)}
                        />
                      </div>
                      <span className={cn("text-xs font-bold", getRateColor(rate))}>
                        {day.completed}/{day.total} · {rate}%
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 flex-shrink-0"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      <div className="p-4 space-y-3">
                        {completedItems.length === 0 ? (
                          <p className="text-xs text-gray-500 text-center py-4">
                            No marcaste ningún hábito este día.
                          </p>
                        ) : (
                          Object.entries(
                            completedItems.reduce((acc, item) => {
                              if (!acc[item.category]) acc[item.category] = [];
                              acc[item.category].push(item);
                              return acc;
                            }, {} as Record<string, HistoryItem[]>)
                          ).map(([cat, catItems]) => {
                            const meta = categoryLabels[cat];
                            return (
                              <div key={cat}>
                                <h4 className="text-xs font-bold text-gray-400 uppercase mb-1.5">
                                  {meta?.emoji} {meta?.label || cat}
                                </h4>
                                <div className="space-y-1">
                                  {catItems.map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-2 text-sm py-1"
                                    >
                                      <span
                                        className={cn(
                                          "w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[10px]",
                                          accentBg,
                                          "text-white"
                                        )}
                                      >
                                        ✓
                                      </span>
                                      <span className="text-xs flex-1 text-gray-300">
                                        {item.itemLabel}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
