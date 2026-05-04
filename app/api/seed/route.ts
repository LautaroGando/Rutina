import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Endpoint para sembrar usuarios iniciales
// Llamar manualmente: GET /api/seed
export async function GET() {
  try {
    const lautaro = await prisma.user.upsert({
      where: { slug: "lautaro" },
      update: { name: "Tataro" },
      create: {
        slug: "lautaro",
        name: "Tataro",
        age: 24,
        goal: "ganar_masa_muscular",
        theme: "lautaro",
      },
    });

    const rocio = await prisma.user.upsert({
      where: { slug: "rocio" },
      update: { name: "Ozio" },
      create: {
        slug: "rocio",
        name: "Ozio",
        age: 26,
        weight: 43,
        height: 1.54,
        goal: "tonificar_ganar_masa",
        theme: "rocio",
      },
    });

    return NextResponse.json({
      success: true,
      users: { lautaro: lautaro.slug, rocio: rocio.slug },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
