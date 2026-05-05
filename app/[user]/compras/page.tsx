import { ShoppingList } from "@/components/ShoppingList";
import { lautaroShoppingList, rocioShoppingList } from "@/lib/data/shopping";
import { getCurrentMonday, formatWeekRange } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const lists = {
  lautaro: lautaroShoppingList,
  rocio: rocioShoppingList,
};

export default async function ComprasPage({
  params,
}: {
  params: Promise<{ user: "lautaro" | "rocio" }>;
}) {
  const { user } = await params;
  const items = lists[user];
  const monday = getCurrentMonday();
  const weekRange = formatWeekRange(monday);

  const isLautaro = user === "lautaro";

  return (
    <div className="space-y-4 md:space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">🛒 Lista de Compras</h1>
        <p className="text-sm md:text-base text-gray-400">
          {isLautaro
            ? "Cantidades para 2 personas (compartís con tu papá). Cubre Lunes a Viernes."
            : "Cantidades para 1 persona. Cubre Lunes a Viernes."}
        </p>
      </div>

      <ShoppingList items={items} user={user} weekRange={weekRange} />
    </div>
  );
}
