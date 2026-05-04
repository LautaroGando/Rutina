// Script que hace `prisma db push` solo si hay DATABASE_URL
// Útil para que el build local no falle si no configuraste la BD aún

const { execSync } = require("child_process");

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl || dbUrl.trim() === "") {
  console.warn("⚠️  DATABASE_URL no está definida - se omite `prisma db push`");
  console.warn("   (Esto es OK si estás buildeando local sin BD configurada)");
  process.exit(0);
}

try {
  console.log("📦 Sincronizando schema con la BD...");
  execSync("npx prisma db push --accept-data-loss", { stdio: "inherit" });
} catch (e) {
  console.error("❌ Error al hacer db push:", e.message);
  process.exit(1);
}
