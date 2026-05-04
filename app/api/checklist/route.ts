import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getTodayDate } from "@/lib/utils";

// POST: Marcar/desmarcar un item de la checklist
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, itemKey, itemLabel, category, completed } = body;

    if (!user || !itemKey) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Buscar usuario
    const dbUser = await prisma.user.findUnique({ where: { slug: user } });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const today = getTodayDate();

    // Upsert: crea o actualiza el log
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
    return NextResponse.json({ error: "Server error" }, { status: 500 });
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

    const dbUser = await prisma.user.findUnique({ where: { slug: user } });
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const today = getTodayDate();

    // Eliminar todos los checks de hoy
    const deleted = await prisma.checkItemLog.deleteMany({
      where: { userId: dbUser.id, date: today },
    });

    return NextResponse.json({ success: true, deleted: deleted.count });
  } catch (error) {
    console.error("Error en DELETE /api/checklist:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
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

    const dbUser = await prisma.user.findUnique({ where: { slug: user } });
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
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
