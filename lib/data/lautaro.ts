import type { ChecklistItem, TimelineItem, WorkoutDay, MealOption, UserStats } from "@/lib/types";

export const lautaroStats: UserStats = {
  caloriesGoal: 2200,
  proteinGoal: 150,
  weeklyGoal: "Ganar 0.3-0.5kg de masa muscular",
};

export const lautaroTimeline: TimelineItem[] = [
  { time: "8:30 AM", emoji: "⏰", title: "DESPERTAR", description: "Levantarse, baño rápido, 2 vasos de agua", detail: "Tu cuerpo está deshidratado. Hidratá ANTES del café." },
  { time: "9:00 AM", emoji: "📝", title: "REGISTRO + DESAYUNO", description: "Registro del día anterior (2 min) + desayuno proteico", detail: "Cabeza fresca para revisar Puntaje de Vida + comida con energía" },
  { time: "10:00 AM", emoji: "💪", title: "ENTRENAMIENTO", description: "45-60 min según día (calistenia pura)", detail: "Lunes: Pecho/Bíceps · Martes: Piernas · Miércoles: Calistenia · Jueves: Descanso · Viernes: Espalda" },
  { time: "11:00 AM", emoji: "🥤", title: "POST-ENTRENO", description: "Licuado proteico + ducha", detail: "Banana + 1 medida de proteína + 250ml leche + avena" },
  { time: "11:30 - 13:00", emoji: "💼", title: "TRABAJO", description: "Programación / tareas freelance" },
  { time: "13:00 - 14:00", emoji: "🍽️", title: "ALMUERZO", description: "Comida fuerte argentina", detail: "Proteína 200g + carbohidrato + verduras" },
  { time: "14:00 - 17:00", emoji: "💼", title: "TRABAJO TARDE", description: "Bloque productivo", detail: "Mate + agua constante" },
  { time: "17:00", emoji: "🧉", title: "MERIENDA", description: "Mate + tostadas o yogur con granola" },
  { time: "18:00 - 18:45", emoji: "💼", title: "CIERRE LABORAL", description: "Cerrar tareas pendientes" },
  { time: "18:45", emoji: "🎒", title: "PREPARAR KIT", description: "Botella + frutos secos + fruta + termo de mate" },
  { time: "19:00 - 01:00", emoji: "🍔", title: "BURGER TILIN", description: "Turno de trabajo (smash burgers)", detail: "Llevá kit anti-chatarra: agua, frutos secos, fruta" },
  { time: "21:30", emoji: "🌙", title: "CENA (durante turno)", description: "En casa de tu hermano - balanceada", detail: "Pollo/carne/cerdo + ensalada + carbohidrato moderado" },
  { time: "1:00 AM", emoji: "🚿", title: "RELAX POST-TRABAJO", description: "Ducha + agua + estiramiento (10 min)", detail: "Volviste cansado. Higiene + relax corto y a dormir." },
  { time: "1:30 - 2:00 AM", emoji: "😴", title: "DORMIR", description: "7 horas de sueño hasta 9:00 AM", detail: "Habitación oscura, fresca, sin pantallas" },
];

export const lautaroChecklist: ChecklistItem[] = [
  // Mañana
  { key: "despertar_horario", label: "Desperté 8:30 AM", category: "morning", time: "8:30" },
  { key: "agua_despertar", label: "2 vasos de agua al despertar", category: "morning" },
  { key: "registro_dia_anterior", label: "Registro del día anterior - 2 min", category: "morning", time: "9:00" },
  { key: "desayuno_proteina", label: "Desayuno con proteína", category: "morning", time: "9:00" },
  { key: "entrenamiento", label: "Entrenamiento (45-60 min)", category: "training", time: "10:00" },
  { key: "licuado_post_entreno", label: "Licuado proteico post-entreno", category: "training", time: "11:00" },

  // Nutrición
  { key: "almuerzo_argentino", label: "Almuerzo argentino completo", category: "nutrition", time: "13:00" },
  { key: "merienda_mate", label: "Merienda con mate", category: "nutrition", time: "17:00" },
  { key: "agua_2_5L", label: "2.5L de agua durante el día", category: "nutrition" },

  // Trabajo y noche
  { key: "kit_burger_tilin", label: "Kit anti-chatarra preparado", category: "post_work", time: "18:45" },
  { key: "cena_balanceada", label: "Cena balanceada (21:30)", category: "post_work" },
  { key: "turno_sin_chatarra", label: "Turno Burger Tilin sin chatarra", category: "night" },
  { key: "relax_post_trabajo", label: "Relax post-trabajo (1:00 AM)", category: "night" },
  { key: "dormir_a_tiempo", label: "Dormir 1:30 - 2:00 AM", category: "night" },
];

export const lautaroWorkouts: WorkoutDay[] = [
  {
    day: "lunes",
    emoji: "💪",
    title: "PECHO + BÍCEPS",
    focus: "Pecho + Bíceps · Calistenia pura",
    duration: "45-60 min",
    warmup: [
      { name: "Rotaciones de brazos", sets: "10 repeticiones" },
      { name: "Flexiones suaves", sets: "15 repeticiones" },
    ],
    exercises: [
      {
        section: "Pecho (peso corporal)",
        items: [
          { name: "Flexiones normales", sets: "4x10-15" },
          { name: "Flexiones diamante (manos juntas)", sets: "3x8-12" },
          { name: "Flexiones inclinadas (pies en silla)", sets: "3x8-12" },
          { name: "Fondos en silla", sets: "3x10-15" },
        ],
      },
      {
        section: "Bíceps (con barra de dominadas)",
        items: [
          { name: "Dominadas supinas (palmas hacia vos)", sets: "4x6-10" },
          { name: "Flexión de bíceps con mochila", sets: "3x10-12" },
          { name: "Plancha", sets: "3x30-45 seg" },
        ],
      },
    ],
  },
  {
    day: "martes",
    emoji: "🦵",
    title: "PIERNAS",
    focus: "Piernas + Glúteos · Sin equipo",
    duration: "45-60 min",
    warmup: [
      { name: "Sentadillas sin peso", sets: "20 repeticiones" },
      { name: "Saltos en el lugar", sets: "30 seg" },
    ],
    exercises: [
      {
        section: "Piernas",
        items: [
          { name: "Sentadillas profundas", sets: "4x15-20" },
          { name: "Sentadillas con mochila pesada", sets: "3x10-15" },
          { name: "Estocadas caminando", sets: "3x12 c/pierna" },
          { name: "Sentadilla búlgara (pie atrás en silla)", sets: "3x10 c/pierna" },
          { name: "Puente de glúteos", sets: "3x15-20" },
          { name: "Sentadillas con salto", sets: "3x10-15" },
          { name: "Elevaciones de gemelos", sets: "3x20-25" },
        ],
      },
    ],
  },
  {
    day: "miercoles",
    emoji: "🤸",
    title: "CALISTENIA + CARDIO",
    focus: "Cuerpo completo + Cardio HIIT",
    duration: "40-50 min",
    exercises: [
      {
        section: "Circuito (3 rondas, 2 min descanso)",
        items: [
          { name: "Escaladores", sets: "30 seg" },
          { name: "Burpees", sets: "20 seg" },
          { name: "Plancha", sets: "40 seg" },
          { name: "Sentadillas con salto", sets: "30 seg" },
          { name: "Flexiones explosivos", sets: "20 seg" },
          { name: "Rodillas al pecho", sets: "30 seg" },
        ],
      },
      {
        section: "Habilidades",
        items: [
          { name: "Dominadas", sets: "3x6-10" },
          { name: "Mantener piernas en L", sets: "3x10-15 seg" },
          { name: "Vertical contra pared", sets: "3x20-30 seg" },
        ],
      },
    ],
  },
  {
    day: "jueves",
    emoji: "🛌",
    title: "DESCANSO",
    focus: "Descanso activo - caminata + estiramiento",
    duration: "30 min suave",
    exercises: [],
  },
  {
    day: "viernes",
    emoji: "🔙",
    title: "ESPALDA + ABDOMINALES",
    focus: "Espalda + Abdominales con barra dominadas",
    duration: "50-60 min",
    warmup: [
      { name: "Rotaciones de hombros", sets: "10 repeticiones" },
      { name: "Dominadas suaves", sets: "8 repeticiones" },
    ],
    exercises: [
      {
        section: "Espalda",
        items: [
          { name: "Dominadas", sets: "4x6-10" },
          { name: "Remo invertido (debajo de mesa)", sets: "4x10-12" },
          { name: "Encogimientos con mochila", sets: "3x12-15" },
          { name: "Súperman", sets: "3x12-15" },
        ],
      },
      {
        section: "Abdominales",
        items: [
          { name: "Plancha lateral", sets: "3x20-30 seg c/lado" },
          { name: "Abdominales", sets: "3x15-20" },
          { name: "Giros rusos", sets: "3x20" },
          { name: "Escaladores", sets: "3x30 seg" },
        ],
      },
    ],
  },
];

export const lautaroMeals = {
  desayuno: [
    { emoji: "🍳", name: "Clásico Argentino", description: "3 huevos + 2 tostadas + queso untable + banana + café con leche", calories: 480, protein: 25 },
    { emoji: "🥣", name: "Avena Energética", description: "Avena cocida con leche + miel + banana + nueces + mate", calories: 520, protein: 18 },
    { emoji: "🍳", name: "Tostadas + Huevo", description: "2 tostadas integrales + queso untable + 2 huevos revueltos + tomate + café", calories: 530, protein: 28 },
    { emoji: "🍓", name: "Yogur con Sabor", description: "2 yogures con sabor + granola + frutillas + miel", calories: 420, protein: 18 },
    { emoji: "🥤", name: "Licuado Express", description: "1 banana + 1 medida proteína + leche + avena + 2 tostadas con dulce de leche light", calories: 500, protein: 30 },
  ] as MealOption[],
  almuerzo: [
    { emoji: "🍗", name: "Lunes - Pollo", description: "Pollo a la plancha + arroz + ensalada (lechuga, tomate, zanahoria)", calories: 600, protein: 45 },
    { emoji: "🥩", name: "Martes - Carne molida", description: "Carne molida con cebolla + puré de papa + tomate", calories: 650, protein: 40 },
    { emoji: "🥖", name: "Miércoles - Milanesa al horno", description: "Milanesa de pollo o carne AL HORNO + papas al horno + ensalada", calories: 700, protein: 45 },
    { emoji: "🍝", name: "Jueves - Pasta", description: "Tallarines integrales con bolognesa + queso rallado", calories: 650, protein: 35 },
    { emoji: "🥩", name: "Viernes - Bife", description: "Bife a la plancha + arroz integral + zapallo, choclo, espinaca", calories: 700, protein: 50 },
    { emoji: "🐷", name: "Sábado - Cerdo", description: "Lomo o bondiola + papa al horno + zapallo + ensalada de espinaca", calories: 650, protein: 45 },
    { emoji: "🔥", name: "Domingo - Asado", description: "Asado argentino + ensalada criolla + 1 pan", calories: 800, protein: 55 },
  ] as MealOption[],
  merienda: [
    { emoji: "🧉", name: "Mate Tradicional", description: "Mate + 2 tostadas integrales + queso dambo + tomate + 1 manzana", calories: 350, protein: 15 },
    { emoji: "🥪", name: "Sándwich Saludable", description: "Pan integral + jamón cocido + queso dambo o cheddar + tomate + lechuga", calories: 380, protein: 22 },
    { emoji: "🍓", name: "Yogur con Sabor + Granola", description: "Yogur de frutilla o vainilla + granola + banana cortada", calories: 340, protein: 12 },
    { emoji: "💪", name: "Batido Proteico", description: "1 medida proteína + 250ml leche + 1 banana + puñado almendras", calories: 380, protein: 35 },
  ] as MealOption[],
  cena: [
    { emoji: "🍗", name: "Pollo + Verduras", description: "Pechuga (150g) a la plancha + zapallo + zanahoria + papa pequeña", calories: 500, protein: 40 },
    { emoji: "🍳", name: "Tortilla Española", description: "3 huevos + papa + cebolla + ensalada (lechuga, tomate)", calories: 480, protein: 25 },
    { emoji: "🐷", name: "Cerdo + Arroz", description: "Lomo de cerdo (180g) + arroz integral + zanahoria salteada", calories: 520, protein: 38 },
    { emoji: "🥗", name: "Ensalada Cargada", description: "Lechuga + huevo duro + tomate + queso dambo + jamón + pan integral", calories: 450, protein: 30 },
    { emoji: "🌯", name: "Rollito Saludable", description: "Rollito integral + pollo desmenuzado + queso cheddar + lechuga + tomate", calories: 500, protein: 32 },
    { emoji: "🍲", name: "Sopa de Zapallo + Sándwich", description: "Sopa casera + sándwich pequeño con queso dambo y jamón", calories: 420, protein: 22 },
  ] as MealOption[],
};
