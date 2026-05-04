import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Sembrando base de datos...");

  // Crear usuario Tataro (Lautaro)
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

  // Crear usuario Ozio (Rocío)
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

  console.log("✅ Usuarios creados:", { lautaro: lautaro.slug, rocio: rocio.slug });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
