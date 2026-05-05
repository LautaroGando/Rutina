import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const TZ = "America/Argentina/Buenos_Aires";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Devuelve la fecha de "hoy" en zona horaria Argentina,
 * representada como UTC midnight (para guardar consistente en BD).
 *
 * Ej: si en Argentina son las 22hs del 4 de mayo,
 *     en UTC son las 01hs del 5 de mayo,
 *     pero queremos que "hoy" sea el 4 de mayo.
 */
export function getTodayDate(): Date {
  const now = new Date();
  // "en-CA" devuelve formato YYYY-MM-DD
  const argDateStr = now.toLocaleDateString("en-CA", { timeZone: TZ });
  return new Date(argDateStr + "T00:00:00.000Z");
}

/**
 * Devuelve el string YYYY-MM-DD del día actual en Argentina
 */
export function getTodayString(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: TZ });
}

/**
 * Devuelve YYYY-MM-DD de un Date que fue guardado como UTC midnight de la fecha argentina.
 * Como guardamos las fechas con `getTodayDate()` (UTC midnight de la fecha argentina),
 * extraemos directamente la parte de fecha UTC para mantener consistencia.
 */
export function dateToArgString(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Formatea una fecha completa en español argentino:
 * "Lunes, 5 de mayo de 2026"
 */
export function formatDateAR(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date + "T12:00:00Z") : date;
  return d.toLocaleDateString("es-AR", {
    timeZone: "UTC", // Las fechas guardadas son UTC midnight de fecha argentina
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formato corto en español: "Lunes, 5 de mayo"
 */
export function formatDateShortAR(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date + "T12:00:00Z") : date;
  return d.toLocaleDateString("es-AR", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/**
 * Devuelve el lunes de la semana actual (zona horaria Argentina) como UTC midnight
 * Útil para agrupar la lista de compras por semana
 */
export function getCurrentMonday(): Date {
  const now = new Date();
  // Fecha argentina como YYYY-MM-DD
  const argDateStr = now.toLocaleDateString("en-CA", { timeZone: TZ });
  const today = new Date(argDateStr + "T00:00:00.000Z");

  // getUTCDay(): 0 = domingo, 1 = lunes, ..., 6 = sábado
  const dayOfWeek = today.getUTCDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const monday = new Date(today);
  monday.setUTCDate(today.getUTCDate() - daysToMonday);
  return monday;
}

/**
 * Formatea un rango de semana: "5 al 11 de mayo"
 */
export function formatWeekRange(monday: Date): string {
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);

  const startDay = monday.getUTCDate();
  const endDay = sunday.getUTCDate();
  const startMonth = monday.toLocaleDateString("es-AR", { timeZone: "UTC", month: "long" });
  const endMonth = sunday.toLocaleDateString("es-AR", { timeZone: "UTC", month: "long" });

  if (startMonth === endMonth) {
    return `${startDay} al ${endDay} de ${startMonth}`;
  }
  return `${startDay} de ${startMonth} al ${endDay} de ${endMonth}`;
}

/**
 * Devuelve la hora actual en Argentina formato HH:MM
 */
export function getCurrentHourAR(): string {
  return new Date().toLocaleTimeString("es-AR", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function calculateLifeScore(
  sleep: number = 0,
  training: number = 0,
  nutrition: number = 0,
  mood: number = 0
): number {
  return sleep + training + nutrition + mood;
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}
