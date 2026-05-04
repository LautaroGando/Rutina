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
    const user = await prisma.user.findUnique({ where: { slug } });
    if (!user) return {};

    const today = getTodayDate();
    const logs = await prisma.checkItemLog.findMany({
      where: { userId: user.id, date: today },
    });

    return logs.reduce((acc, log) => {
      acc[log.itemKey] = log.completed;
      return acc;
    }, {} as Record<string, boolean>);
  } catch (e) {
    console.error("Error cargando checks:", e);
    return {};
  }
}

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
