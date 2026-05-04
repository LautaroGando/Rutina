import { HistoryView } from "@/components/HistoryView";

export default async function HistorialPage({
  params,
}: {
  params: Promise<{ user: "lautaro" | "rocio" }>;
}) {
  const { user } = await params;

  return (
    <div className="space-y-4 md:space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">📅 Histórico</h1>
        <p className="text-sm md:text-base text-gray-400">
          Tu progreso día por día. Tocá un día para ver el detalle.
        </p>
      </div>

      <HistoryView user={user} />
    </div>
  );
}
