import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { lautaroChecklist } from "@/lib/data/lautaro";
import { rocioChecklist } from "@/lib/data/rocio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET: Obtener historial de los últimos N días
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userSlug = searchParams.get("user");
    const days = parseInt(searchParams.get("days") || "30");

    if (!userSlug) {
      return NextResponse.json({ error: "Missing user" }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({ where: { slug: userSlug } });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Total de hábitos posibles según el checklist del usuario
    const checklistTemplate =
      userSlug === "lautaro" ? lautaroChecklist : rocioChecklist;
    const totalPossible = checklistTemplate.length;

    // Calcular rango
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);
    daysAgo.setHours(0, 0, 0, 0);

    // Obtener todos los logs en el rango
    const logs = await prisma.checkItemLog.findMany({
      where: { userId: dbUser.id, date: { gte: daysAgo } },
      orderBy: { date: "desc" },
    });

    // Agrupar por fecha
    type HistoryItem = {
      itemKey: string;
      itemLabel: string;
      category: string;
      completed: boolean;
      completedAt: Date | null;
    };
    type HistoryDay = {
      date: string;
      items: HistoryItem[];
      total: number; // total de hábitos posibles del día
      completed: number; // cuántos marcó
    };
    const grouped: Record<string, HistoryDay> = {};

    for (const log of logs) {
      const dateKey = log.date.toISOString().split("T")[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: dateKey,
          items: [],
          total: totalPossible,
          completed: 0,
        };
      }
      grouped[dateKey].items.push({
        itemKey: log.itemKey,
        itemLabel: log.itemLabel,
        category: log.category,
        completed: log.completed,
        completedAt: log.completedAt,
      });
      if (log.completed) grouped[dateKey].completed++;
    }

    const history = Object.values(grouped).sort((a, b) =>
      b.date.localeCompare(a.date)
    );

    return NextResponse.json({ history, totalPossible });
  } catch (error) {
    console.error("Error en GET /api/history:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
