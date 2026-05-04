import { WorkoutCard } from "@/components/WorkoutCard";
import { lautaroWorkouts } from "@/lib/data/lautaro";
import { rocioWorkouts } from "@/lib/data/rocio";

const workouts = {
  lautaro: lautaroWorkouts,
  rocio: rocioWorkouts,
};

export default async function EntrenamientoPage({
  params,
}: {
  params: Promise<{ user: "lautaro" | "rocio" }>;
}) {
  const { user } = await params;
  const userWorkouts = workouts[user];

  const dayMap: Record<number, string> = {
    0: "domingo", 1: "lunes", 2: "martes", 3: "miercoles", 4: "jueves", 5: "viernes", 6: "sabado",
  };
  const todayDay = dayMap[new Date().getDay()];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">🏋️ Entrenamientos</h1>
        <p className="text-sm md:text-base text-gray-400">
          {user === "lautaro"
            ? "Calistenia pura · Solo necesitás tu cuerpo + barra dominadas + silla + mochila"
            : "Peso corporal + banda elástica · 30-40 min por sesión"}
        </p>
      </div>

      {/* Grid en desktop: 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {userWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.day}
            workout={workout}
            theme={user}
            defaultOpen={workout.day === todayDay}
          />
        ))}
      </div>
    </div>
  );
}
