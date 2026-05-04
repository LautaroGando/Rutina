import { MealCard } from "@/components/MealCard";
import { lautaroMeals } from "@/lib/data/lautaro";
import { rocioMeals } from "@/lib/data/rocio";

export default async function AlimentacionPage({
  params,
}: {
  params: Promise<{ user: "lautaro" | "rocio" }>;
}) {
  const { user } = await params;

  const meals = user === "lautaro" ? lautaroMeals : rocioMeals;

  const sections =
    user === "lautaro"
      ? [
          { key: "desayuno", title: "🌅 Desayuno (9:00)", items: meals.desayuno },
          { key: "almuerzo", title: "🍽️ Almuerzo (13:00)", items: meals.almuerzo },
          { key: "merienda", title: "🧉 Merienda (17:00)", items: meals.merienda },
          { key: "cena", title: "🌙 Cena (21:30 en casa de hermano)", items: meals.cena },
        ]
      : [
          { key: "desayuno", title: "🌅 Desayuno (8:00)", items: meals.desayuno },
          { key: "colacion_manana", title: "☕ Colación mañana (11:00)", items: (meals as typeof rocioMeals).colacion_manana },
          { key: "almuerzo", title: "🍽️ Almuerzo (13:00)", items: meals.almuerzo },
          { key: "merienda", title: "🧉 Merienda (19:15 al llegar)", items: meals.merienda },
          { key: "cena", title: "🌙 Cena (21:30 - 22:00)", items: meals.cena },
        ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">🍽️ Alimentación</h1>
        <p className="text-sm md:text-base text-gray-400">
          {user === "lautaro"
            ? "Plan argentino sin pescado/atún · Para ganar masa muscular"
            : "Plan para GANAR masa · 2200 kcal/día · 75g proteína · 5 comidas"}
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.key}>
          <h2 className="text-base md:text-lg font-bold mb-3 px-1">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
            {section.items.map((meal, i) => (
              <MealCard key={i} meal={meal} theme={user} index={i} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
