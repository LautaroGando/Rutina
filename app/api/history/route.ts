import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET: Obtener historial de los últimos N días
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");
    const days = parseInt(searchParams.get("days") || "30");

    if (!user) {
      return NextResponse.json({ error: "Missing user" }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({ where: { slug: user } });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

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
    const grouped = logs.reduce(
      (acc, log) => {
        const dateKey = log.date.toISOString().split("T")[0];
        if (!acc[dateKey]) {
          acc[dateKey] = { date: dateKey, items: [], total: 0, completed: 0 };
        }
        acc[dateKey].items.push({
          itemKey: log.itemKey,
          itemLabel: log.itemLabel,
          category: log.category,
          completed: log.completed,
          completedAt: log.completedAt,
        });
        acc[dateKey].total++;
        if (log.completed) acc[dateKey].completed++;
        return acc;
      },
      {} as Record<
        string,
        {
          date: string;
          items: { itemKey: string; itemLabel: string; category: string; completed: boolean; completedAt: Date | null }[];
          total: number;
          completed: number;
        }
      >
    );

    const history = Object.values(grouped).sort((a, b) => b.date.localeCompare(a.date));

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Error en GET /api/history:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
