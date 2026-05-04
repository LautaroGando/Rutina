"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChecklistItem } from "@/lib/types";

interface DailyChecklistProps {
  items: ChecklistItem[];
  user: "lautaro" | "rocio";
  initialChecked?: Record<string, boolean>;
}

const categoryLabels: Record<string, { emoji: string; label: string }> = {
  morning: { emoji: "🌅", label: "Mañana" },
  training: { emoji: "💪", label: "Entrenamiento" },
  nutrition: { emoji: "🍽️", label: "Nutrición" },
  post_work: { emoji: "🚆", label: "Post-Trabajo" },
  night: { emoji: "🌙", label: "Noche" },
  goals: { emoji: "🎯", label: "Objetivos del día" },
};

export function DailyChecklist({ items, user, initialChecked = {} }: DailyChecklistProps) {
  const router = useRouter();
  const [checked, setChecked] = useState<Record<string, boolean>>(initialChecked);
  const [saving, setSaving] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [currentDay, setCurrentDay] = useState(() => new Date().toDateString());

  // 🕛 AUTO-REFRESH A MEDIANOCHE
  useEffect(() => {
    const checkDayChange = () => {
      const newDay = new Date().toDateString();
      if (newDay !== currentDay) {
        // ¡Cambió el día! Recargar la página para limpiar checks
        setCurrentDay(newDay);
        setChecked({});
        router.refresh();
      }
    };

    // Calcular ms hasta la próxima medianoche
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 1, 0); // 00:00:01 del día siguiente
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Timer principal: dispara exacto a medianoche
    const midnightTimer = setTimeout(() => {
      checkDayChange();
      // Después de medianoche, chequear cada hora por seguridad
      const hourlyInterval = setInterval(checkDayChange, 60 * 60 * 1000);
      return () => clearInterval(hourlyInterval);
    }, msUntilMidnight);

    // Backup: chequear cada 5 minutos por si el timer se desincroniza
    // (puede pasar si la pestaña queda en background mucho tiempo)
    const backupInterval = setInterval(checkDayChange, 5 * 60 * 1000);

    // Chequear al volver al tab (visibility)
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        checkDayChange();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimeout(midnightTimer);
      clearInterval(backupInterval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [currentDay, router]);

  // Agrupa items por categoría
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const toggle = async (key: string, label: string, category: string) => {
    const newValue = !checked[key];
    setChecked((prev) => ({ ...prev, [key]: newValue }));

    setSaving(true);
    try {
      await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          itemKey: key,
          itemLabel: label,
          category,
          completed: newValue,
        }),
      });
    } catch (e) {
      console.error("Error guardando check:", e);
    } finally {
      setSaving(false);
    }
  };

  const resetToday = async () => {
    setSaving(true);
    try {
      await fetch(`/api/checklist?user=${user}`, {
        method: "DELETE",
      });
      setChecked({});
      setShowResetConfirm(false);
    } catch (e) {
      console.error("Error reseteando:", e);
    } finally {
      setSaving(false);
    }
  };

  const accentColor = user === "lautaro" ? "border-cyan-400 bg-cyan-400" : "border-pink-400 bg-pink-400";
  const textColor = user === "lautaro" ? "text-cyan-400" : "text-pink-400";

  const getCategoryProgress = (cat: string) => {
    const catItems = grouped[cat] || [];
    const done = catItems.filter((i) => checked[i.key]).length;
    return { done, total: catItems.length };
  };

  const totalDone = items.filter((i) => checked[i.key]).length;
  const totalProgress = (totalDone / items.length) * 100;

  return (
    <div className="space-y-5">
      {/* Barra de progreso global */}
      <div className="glass rounded-xl p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Progreso de hoy</span>
          <span className={cn("text-sm font-bold", textColor)}>
            {totalDone}/{items.length}
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "h-full rounded-full",
              user === "lautaro" ? "gradient-lautaro" : "gradient-rocio"
            )}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          {saving ? (
            <p className="text-xs text-gray-500">💾 Guardando...</p>
          ) : (
            <p className="text-xs text-gray-500">✅ Guardado automáticamente</p>
          )}

          {/* Botón Reset */}
          {totalDone > 0 && (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reiniciar
            </button>
          )}
        </div>
      </div>

      {/* Modal de confirmación de reset */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1a1a2e] rounded-2xl p-6 max-w-sm w-full border border-white/10 shadow-2xl"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1">¿Reiniciar hoy?</h3>
                  <p className="text-sm text-gray-400">
                    Se van a desmarcar todos los hábitos de hoy. Los días anteriores no se afectan.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={resetToday}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold transition-colors text-sm disabled:opacity-50"
                >
                  {saving ? "Reiniciando..." : "Sí, reiniciar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categorías */}
      {Object.entries(grouped).map(([category, catItems]) => {
        const { done, total } = getCategoryProgress(category);
        const meta = categoryLabels[category];

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">
                {meta?.emoji} {meta?.label || category}
              </h3>
              <span className={cn("text-xs", textColor)}>
                {done}/{total}
              </span>
            </div>

            <div className="space-y-2">
              {catItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggle(item.key, item.label, item.category)}
                  className="w-full flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                >
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className={cn(
                      "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0",
                      checked[item.key]
                        ? cn(accentColor, "text-[#1a1a2e]")
                        : "border-white/20 bg-transparent"
                    )}
                  >
                    <AnimatePresence>
                      {checked[item.key] && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <span
                    className={cn(
                      "text-sm flex-1",
                      checked[item.key] && "line-through text-gray-500"
                    )}
                  >
                    {item.label}
                  </span>

                  {item.time && (
                    <span className="text-xs text-gray-500">{item.time}</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
