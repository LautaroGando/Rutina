import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/Card";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import { History, ChevronRight } from "lucide-react";

// Forzar runtime nodejs y dinámico
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getStats(slug: "lautaro" | "rocio") {
  try {
    const user = await prisma.user.findUnique({ where: { slug } });
    if (!user) return null;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const checks = await prisma.checkItemLog.groupBy({
      by: ["date"],
      where: { userId: user.id, date: { gte: sevenDaysAgo }, completed: true },
      _count: { _all: true },
    });

    let totalThisWeek = 0;
    for (const c of checks) {
      totalThisWeek += c._count._all;
    }

    const allChecks = await prisma.checkItemLog.findMany({
      where: { userId: user.id, completed: true },
      orderBy: { date: "desc" },
      distinct: ["date"],
    });

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < allChecks.length; i++) {
      const checkDate = new Date(allChecks[i].date);
      checkDate.setHours(0, 0, 0, 0);
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (checkDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return { totalThisWeek, streak, daysActive: checks.length };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function SeguimientoPage({
  params,
}: {
  params: Promise<{ user: "lautaro" | "rocio" }>;
}) {
  const { user } = await params;
  const stats = await getStats(user);

  const accent = user === "lautaro" ? "text-cyan-400" : "text-pink-400";
  const accentBg = user === "lautaro" ? "gradient-lautaro" : "gradient-rocio";

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">📊 Mi Progreso</h1>
        <p className="text-sm text-gray-400">Seguimiento de tu consistencia diaria.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardTitle>🔥 Racha</CardTitle>
          <div className={cn("text-4xl font-bold", accent)}>{stats?.streak || 0}</div>
          <p className="text-xs text-gray-400 mt-1">días seguidos</p>
        </Card>

        <Card>
          <CardTitle>📅 Días activos</CardTitle>
          <div className={cn("text-4xl font-bold", accent)}>{stats?.daysActive || 0}/7</div>
          <p className="text-xs text-gray-400 mt-1">esta semana</p>
        </Card>

        <Card className="col-span-2">
          <CardTitle>✅ Hábitos cumplidos esta semana</CardTitle>
          <div className={cn("text-5xl font-bold", accent)}>{stats?.totalThisWeek || 0}</div>
          <p className="text-xs text-gray-400 mt-1">acciones completadas</p>
        </Card>
      </div>

      {/* Link al histórico */}
      <Link href={`/${user}/historial`}>
        <Card className="!p-4 cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", accentBg)}>
                <History className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">Ver histórico completo</div>
                <div className="text-xs text-gray-400">Tu progreso día por día</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>
      </Link>

      <Card hover={false}>
        <CardTitle>💡 Tip</CardTitle>
        <p className="text-sm text-gray-300">
          {stats && stats.streak >= 3
            ? `¡${stats.streak} días seguidos! La constancia es la clave. Seguí así. 💪`
            : "Empezá hoy. Marcá tu primer hábito en la pestaña ✅ Hábitos."}
        </p>
      </Card>
    </div>
  );
}
