const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const svgPath = path.join(__dirname, "..", "public", "icon.svg");
const publicDir = path.join(__dirname, "..", "public");

async function generate() {
  if (!fs.existsSync(svgPath)) {
    console.error("❌ icon.svg no encontrado");
    process.exit(1);
  }

  const svg = fs.readFileSync(svgPath);

  const sizes = [
    { size: 192, name: "icon-192.png" },
    { size: 512, name: "icon-512.png" },
    { size: 180, name: "apple-icon.png" },
    { size: 32, name: "favicon-32.png" },
    { size: 16, name: "favicon-16.png" },
  ];

  for (const { size, name } of sizes) {
    const outPath = path.join(publicDir, name);
    await sharp(svg).resize(size, size).png().toFile(outPath);
    console.log(`✅ ${name} (${size}x${size})`);
  }

  console.log("\n🎉 Iconos generados");
}

generate().catch(console.error);
