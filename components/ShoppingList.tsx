"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw, Share2, Copy, AlertCircle, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type ShoppingItem,
  type ShoppingCategory,
  categoryMeta,
} from "@/lib/data/shopping";

interface ShoppingListProps {
  items: ShoppingItem[];
  user: "lautaro" | "rocio";
  weekRange: string;
}

export function ShoppingList({ items, user, weekRange }: ShoppingListProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  // Cargar estado inicial desde la BD
  useEffect(() => {
    fetch(`/api/shopping?user=${user}`)
      .then((r) => r.json())
      .then((data) => {
        const initial: Record<string, boolean> = {};
        for (const log of data.logs || []) {
          initial[log.itemKey] = log.completed;
        }
        setChecked(initial);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [user]);

  const accent = user === "lautaro" ? "text-cyan-400" : "text-pink-400";
  const accentBg = user === "lautaro" ? "gradient-lautaro" : "gradient-rocio";
  const checkBg =
    user === "lautaro" ? "border-cyan-400 bg-cyan-400" : "border-pink-400 bg-pink-400";

  // Agrupar por categoría
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<ShoppingCategory, ShoppingItem[]>);

  // Categorías ordenadas
  const orderedCategories = (Object.keys(grouped) as ShoppingCategory[]).sort(
    (a, b) => categoryMeta[a].order - categoryMeta[b].order
  );

  // Cálculos
  const totalItems = items.length;
  const totalCompleted = items.filter((i) => checked[i.key]).length;
  const totalProgress = (totalCompleted / totalItems) * 100;

  const totalPrice = items.reduce((sum, i) => sum + i.estimatedPrice, 0);
  const pendingPrice = items
    .filter((i) => !checked[i.key])
    .reduce((sum, i) => sum + i.estimatedPrice, 0);
  const completedPrice = totalPrice - pendingPrice;

  const formatPrice = (n: number) =>
    n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

  const toggle = async (item: ShoppingItem) => {
    const newValue = !checked[item.key];
    setChecked((prev) => ({ ...prev, [item.key]: newValue }));

    setSaving(true);
    try {
      await fetch("/api/shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          itemKey: item.key,
          itemLabel: item.label,
          category: item.category,
          completed: newValue,
        }),
      });
    } catch (e) {
      console.error("Error guardando:", e);
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    setSaving(true);
    try {
      await fetch(`/api/shopping?user=${user}`, { method: "DELETE" });
      setChecked({});
      setShowResetConfirm(false);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  // Generar texto para WhatsApp
  const generateShareText = () => {
    let text = `🛒 *Lista de Compras - ${user === "lautaro" ? "Tataro" : "Ozio"}*\n`;
    text += `📅 _${weekRange}_\n\n`;

    for (const category of orderedCategories) {
      const meta = categoryMeta[category];
      const catItems = grouped[category];
      const pending = catItems.filter((i) => !checked[i.key]);

      if (pending.length > 0) {
        text += `*${meta.emoji} ${meta.label.toUpperCase()}*\n`;
        for (const item of pending) {
          text += `${item.emoji} ${item.label} - _${item.quantity}_\n`;
        }
        text += "\n";
      }
    }

    text += `💰 *Total estimado:* ${formatPrice(pendingPrice)}\n`;
    text += `\n_Generado por Life OS 💪_`;

    return text;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Error copiando:", e);
    }
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(generateShareText());
    const url = `https://wa.me/?text=${text}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="glass rounded-xl p-8 text-center text-gray-400 text-sm">
        Cargando lista...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header con progreso */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ShoppingCart className={cn("w-4 h-4", accent)} />
            <span className="text-sm font-semibold">Semana del {weekRange}</span>
          </div>
          <span className={cn("text-sm font-bold", accent)}>
            {totalCompleted}/{totalItems}
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn("h-full rounded-full", accentBg)}
          />
        </div>

        {/* Costos */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/5">
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-0.5">Total</div>
            <div className="text-sm font-bold">{formatPrice(totalPrice)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-0.5">Comprado</div>
            <div className="text-sm font-bold text-green-400">
              {formatPrice(completedPrice)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-0.5">Falta</div>
            <div className={cn("text-sm font-bold", accent)}>
              {formatPrice(pendingPrice)}
            </div>
          </div>
        </div>

        {/* Status + acciones */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          {saving ? (
            <p className="text-xs text-gray-500">💾 Guardando...</p>
          ) : (
            <p className="text-xs text-gray-500">✅ Auto-guardado</p>
          )}
          {totalCompleted > 0 && (
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

      {/* Botones de compartir */}
      <div className="flex gap-2">
        <button
          onClick={shareWhatsApp}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-transform active:scale-95",
            accentBg,
            "text-white shadow-lg"
          )}
        >
          <Share2 className="w-4 h-4" />
          WhatsApp
        </button>
        <button
          onClick={copyToClipboard}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-sm font-semibold hover:bg-white/10 transition-colors"
        >
          <Copy className="w-4 h-4" />
          {copied ? "¡Copiado!" : "Copiar"}
        </button>
      </div>

      {/* Modal de reset */}
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
                  <h3 className="font-bold text-base mb-1">¿Reiniciar lista?</h3>
                  <p className="text-sm text-gray-400">
                    Se van a desmarcar todos los items de esta semana.
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
                  onClick={reset}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold transition-colors text-sm disabled:opacity-50"
                >
                  {saving ? "..." : "Reiniciar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categorías */}
      {orderedCategories.map((category) => {
        const meta = categoryMeta[category];
        const catItems = grouped[category];
        const catDone = catItems.filter((i) => checked[i.key]).length;

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">
                {meta.emoji} {meta.label}
              </h3>
              <span className={cn("text-xs", accent)}>
                {catDone}/{catItems.length}
              </span>
            </div>

            <div className="space-y-1">
              {catItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => toggle(item)}
                  className="w-full flex items-start gap-3 py-2.5 px-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                >
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    className={cn(
                      "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5",
                      checked[item.key]
                        ? cn(checkBg, "text-[#1a1a2e]")
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

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          checked[item.key] && "line-through text-gray-500"
                        )}
                      >
                        {item.emoji} {item.label}
                      </span>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {formatPrice(item.estimatedPrice)}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "text-xs",
                        checked[item.key] ? "text-gray-600" : "text-gray-400"
                      )}
                    >
                      <span className="font-medium">{item.quantity}</span>
                      {item.note && <span className="text-gray-500"> · {item.note}</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      })}

      <div className="text-center text-xs text-gray-500 pt-4">
        💡 Los items se reinician automáticamente cada lunes
      </div>
    </div>
  );
}
