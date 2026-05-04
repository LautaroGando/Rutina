import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getTodayDate } from "@/lib/utils";

// Forzar runtime nodejs (Prisma no funciona en edge)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Asegurarse que el user existe (auto-seed)
async function ensureUser(slug: string) {
  let user = await prisma.user.findUnique({ where: { slug } });

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

  return user;
}

// POST: Marcar/desmarcar un item de la checklist
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, itemKey, itemLabel, category, completed } = body;

    if (!user || !itemKey) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const dbUser = await ensureUser(user);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found and could not be created" }, { status: 404 });
    }

    const today = getTodayDate();

    const log = await prisma.checkItemLog.upsert({
      where: {
        userId_date_itemKey: {
          userId: dbUser.id,
          date: today,
          itemKey,
        },
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId: dbUser.id,
        date: today,
        itemKey,
        itemLabel: itemLabel || itemKey,
        category: category || "general",
        completed,
        completedAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, log });
  } catch (error) {
    console.error("Error en POST /api/checklist:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// DELETE: Reiniciar todos los checks de hoy
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");

    if (!user) {
      return NextResponse.json({ error: "Missing user" }, { status: 400 });
    }

    const dbUser = await ensureUser(user);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const today = getTodayDate();
    const deleted = await prisma.checkItemLog.deleteMany({
      where: { userId: dbUser.id, date: today },
    });

    return NextResponse.json({ success: true, deleted: deleted.count });
  } catch (error) {
    console.error("Error en DELETE /api/checklist:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// GET: Obtener checks del día actual de un usuario
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const user = searchParams.get("user");
    const date = searchParams.get("date");

    if (!user) {
      return NextResponse.json({ error: "Missing user" }, { status: 400 });
    }

    const dbUser = await ensureUser(user);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const queryDate = date ? new Date(date) : getTodayDate();

    const logs = await prisma.checkItemLog.findMany({
      where: { userId: dbUser.id, date: queryDate },
    });

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Error en GET /api/checklist:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
