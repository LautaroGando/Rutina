# 💪 Life OS - Sistema de Vida

Aplicación Next.js para gestionar la rutina diaria de Lautaro y Rocío:
hábitos, entrenamiento, alimentación y seguimiento.

## 🚀 Stack

- **Next.js 15** (App Router + Server Components)
- **TypeScript** estricto
- **Tailwind CSS** mobile-first
- **Prisma + SQLite** base de datos local
- **Framer Motion** animaciones fluidas
- **Lucide React** iconos

## 📦 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Generar cliente de Prisma + crear base de datos
npm run db:push

# 3. Sembrar usuarios iniciales (Lautaro y Rocío)
npm run db:seed

# 4. Levantar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 🗂 Estructura

```
rutina/
├── app/
│   ├── layout.tsx               # Layout raíz
│   ├── page.tsx                 # Redirect → /lautaro
│   ├── globals.css              # Estilos globales
│   ├── [user]/                  # Ruta dinámica por usuario
│   │   ├── layout.tsx           # Header + Navigation
│   │   ├── page.tsx             # Dashboard / Hoy
│   │   ├── entrenamiento/
│   │   ├── alimentacion/
│   │   ├── checklist/
│   │   └── seguimiento/
│   └── api/
│       ├── checklist/route.ts   # POST/GET items checklist
│       └── seed/route.ts        # Crear usuarios
├── components/
│   ├── ui/                      # Card, Button (átomos)
│   ├── Header.tsx
│   ├── Navigation.tsx           # Bottom nav móvil
│   ├── PersonSwitcher.tsx       # Switcher Lautaro/Rocío
│   ├── Timeline.tsx
│   ├── DailyChecklist.tsx
│   ├── MealCard.tsx
│   ├── WorkoutCard.tsx
│   └── StatsOverview.tsx
├── lib/
│   ├── db.ts                    # Cliente Prisma singleton
│   ├── utils.ts                 # cn(), helpers
│   ├── types.ts                 # Tipos compartidos
│   └── data/
│       ├── lautaro.ts           # Datos de Lautaro
│       └── rocio.ts             # Datos de Rocío
├── prisma/
│   ├── schema.prisma            # Esquema BD
│   └── seed.ts                  # Datos iniciales
└── package.json
```

## 📊 Modelos en la base de datos

- **User** - Lautaro y Rocío
- **DailyEntry** - Registro diario por persona (puntaje de vida)
- **CheckItemLog** - Cada hábito marcado/no marcado por día
- **WorkoutLog** - Entrenamientos hechos
- **MealLog** - Comidas registradas

Cada acción (check de hábito) se guarda automáticamente.
La pestaña **Stats** muestra: racha, días activos, hábitos cumplidos.

## 🎨 Diseño

- **Mobile-first** (max-width: 448px / md)
- **Tema oscuro** elegante
- **Lautaro:** azul (cyan)
- **Rocío:** rosa (pink)
- Animaciones fluidas con Framer Motion
- Bottom navigation tipo app móvil

## 🗄 Base de datos

SQLite local en `prisma/dev.db`. Para cambiar a PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🔄 Comandos útiles

```bash
npm run dev          # Servidor desarrollo
npm run build        # Build producción
npm run db:push      # Sincronizar schema con BD
npm run db:seed      # Sembrar usuarios
npm run db:studio    # GUI Prisma Studio
```
