import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/Timeline";
import { StatsOverview } from "@/components/StatsOverview";
import { lautaroTimeline, lautaroStats } from "@/lib/data/lautaro";
import { rocioTimeline, rocioStats } from "@/lib/data/rocio";

const data = {
  lautaro: { timeline: lautaroTimeline, stats: lautaroStats, name: "Tataro" },
  rocio: { timeline: rocioTimeline, stats: rocioStats, name: "Ozio" },
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ user: "lautaro" | "rocio" }>;
}) {
  const { user } = await params;
  const userData = data[user];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Mensaje motivacional */}
      <Card className="text-center" hover={false}>
        <p className="text-base md:text-lg">
          🎯 <strong>Hola, {userData.name}.</strong>
          <br />
          <span className="text-sm md:text-base text-gray-400 mt-2 block">
            {user === "lautaro"
              ? "Día a día construimos disciplina, masa y energía."
              : "Comer más, mover más, dormir mejor. Crecé sin presión."}
          </span>
        </p>
      </Card>

      {/* Grid: Stats + Timeline (desktop side-by-side) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats - 1 col en desktop */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg md:text-xl font-bold mb-3 px-1">📊 Mi Plan</h2>
          <StatsOverview stats={userData.stats} theme={user} />
        </div>

        {/* Timeline - 2 cols en desktop */}
        <div className="lg:col-span-2">
          <h2 className="text-lg md:text-xl font-bold mb-3 px-1">📅 Tu día tipo</h2>
          <Card className="!p-4 md:!p-6" hover={false}>
            <Timeline items={userData.timeline} theme={user} />
          </Card>
        </div>
      </div>
    </div>
  );
}
