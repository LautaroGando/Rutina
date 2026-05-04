import { DailyChecklist } from "@/components/DailyChecklist";
import { lautaroChecklist } from "@/lib/data/lautaro";
import { rocioChecklist } from "@/lib/data/rocio";
import { prisma } from "@/lib/db";
import { getTodayDate } from "@/lib/utils";

const checklists = {
  lautaro: lautaroChecklist,
  rocio: rocioChecklist,
};

async function getInitialChecks(slug: "lautaro" | "rocio"): Promise<Record<string, boolean>> {
  try {
    let user = await prisma.user.findUnique({ where: { slug } });

    // Auto-crear si no existe
    if (!user) {
      if (slug === "lautaro") {
        user = await prisma.user.create({
          data: {
            slug: "lautaro",
            name: "Tataro",
            age: 24,
            goal: "ganar_masa_muscular",
            theme: "lautaro",
          },
        });
      } else if (slug === "rocio") {
        user = await prisma.user.create({
          data: {
            slug: "rocio",
            name: "Ozio",
            age: 26,
            weight: 43,
            height: 1.54,
            goal: "tonificar_ganar_masa",
            theme: "rocio",
          },
        });
      }
    }

    if (!user) return {};

    const today = getTodayDate();
    const logs = await prisma.checkItemLog.findMany({
      where: { userId: user.id, date: today },
    });

    const result: Record<string, boolean> = {};
    for (const log of logs) {
      result[log.itemKey] = log.completed;
    }
    return result;
  } catch (e) {
    console.error("Error cargando checks:", e);
    return {};
  }
}

// Forzar runtime nodejs (no edge) para usar Prisma
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ user: "lautaro" | "rocio" }>;
}) {
  const { user } = await params;
  const items = checklists[user];
  const initialChecked = await getInitialChecks(user);

  return (
    <div className="space-y-4 md:space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">✅ Hábitos de Hoy</h1>
        <p className="text-sm md:text-base text-gray-400">
          Marcá cada cosa al ir cumpliéndola. Se guarda automáticamente.
        </p>
      </div>

      <DailyChecklist items={items} user={user} initialChecked={initialChecked} />
    </div>
  );
}
