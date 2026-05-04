import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Singleton para evitar múltiples instancias en desarrollo
const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof createPrismaClient>;
};

function createPrismaClient() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.warn("⚠️ DATABASE_URL no está definida. Las queries van a fallar.");
  }

  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  // Si la URL es de Prisma Accelerate (prisma:// o prisma+postgres://), usar la extensión
  if (dbUrl && (dbUrl.startsWith("prisma://") || dbUrl.startsWith("prisma+postgres://"))) {
    return client.$extends(withAccelerate());
  }

  return client;
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
