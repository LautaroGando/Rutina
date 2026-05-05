import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentMonday } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

// GET: Obtener checks de la semana actual
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userSlug = searchParams.get("user");

    if (!userSlug) {
      return NextResponse.json({ error: "Missing user" }, { status: 400 });
    }

    const dbUser = await ensureUser(userSlug);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const monday = getCurrentMonday();

    const logs = await prisma.shoppingCheckLog.findMany({
      where: { userId: dbUser.id, weekStart: monday },
    });

    return NextResponse.json({ logs, weekStart: monday.toISOString() });
  } catch (error) {
    console.error("Error en GET /api/shopping:", error);
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// POST: Marcar/desmarcar item de compra
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, itemKey, itemLabel, category, completed } = body;

    if (!user || !itemKey) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const dbUser = await ensureUser(user);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const monday = getCurrentMonday();

    const log = await prisma.shoppingCheckLog.upsert({
      where: {
        userId_weekStart_itemKey: {
          userId: dbUser.id,
          weekStart: monday,
          itemKey,
        },
      },
      update: {
        completed,
        completedAt: completed ? new Date() : null,
      },
      create: {
        userId: dbUser.id,
        weekStart: monday,
        itemKey,
        itemLabel: itemLabel || itemKey,
        category: category || "general",
        completed,
        completedAt: completed ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, log });
  } catch (error) {
    console.error("Error en POST /api/shopping:", error);
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE: Reiniciar lista de la semana
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userSlug = searchParams.get("user");

    if (!userSlug) {
      return NextResponse.json({ error: "Missing user" }, { status: 400 });
    }

    const dbUser = await ensureUser(userSlug);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const monday = getCurrentMonday();
    const deleted = await prisma.shoppingCheckLog.deleteMany({
      where: { userId: dbUser.id, weekStart: monday },
    });

    return NextResponse.json({ success: true, deleted: deleted.count });
  } catch (error) {
    console.error("Error en DELETE /api/shopping:", error);
    return NextResponse.json(
      { error: "Server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
