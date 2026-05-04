import type { ChecklistItem, TimelineItem, WorkoutDay, MealOption, UserStats } from "@/lib/types";

export const rocioStats: UserStats = {
  weight: 43,
  height: 1.54,
  bmi: 18.1,
  caloriesGoal: 2200,
  proteinGoal: 75,
  weeklyGoal: "Ganar 0.3kg semanal de masa muscular",
};

export const rocioTimeline: TimelineItem[] = [
  { time: "7:30 AM", emoji: "⏰", title: "DESPERTAR", description: "Levantarse, baño, 2 vasos de agua", detail: "Hidratación primero. Despertar lento sin celular." },
  { time: "8:00 AM", emoji: "🌅", title: "DESAYUNO POTENTE", description: "Proteína + carbohidrato + grasa buena", detail: "Tenés que comer MÁS de lo que comés hoy." },
  { time: "8:30 AM", emoji: "🚆", title: "SALIR (1h viaje)", description: "Llevar mochila con: botella agua + colación" },
  { time: "9:30 - 13:00", emoji: "💼", title: "TRABAJO", description: "Oficina + colación a las 11:00", detail: "Colación: yogur + fruta o frutos secos" },
  { time: "13:00 - 14:00", emoji: "🍽️", title: "ALMUERZO", description: "Comida fuerte (proteína + carbohidrato + verduras)", detail: "Llevar tupper desde casa." },
  { time: "14:00 - 17:00", emoji: "💼", title: "TRABAJO TARDE", description: "Tarde productiva", detail: "Mate + agua constante" },
  { time: "18:00", emoji: "🚆", title: "SALIR DEL TRABAJO", description: "1h de viaje a casa", detail: "Aprovechá: leer, podcast, descanso mental" },
  { time: "19:00", emoji: "🏠", title: "LLEGADA A CASA", description: "Cambiarse, agua, descanso 10 min", detail: "LUNES: directo a bachata 19-20hs" },
  { time: "19:15", emoji: "🧉", title: "MERIENDA (en casa)", description: "Mate + tostadas o yogur con granola", detail: "Mar/Mié/Jue/Vie. LUNES: NO merendás (vas a bachata)" },
  { time: "19:30", emoji: "💪", title: "ENTRENAMIENTO (Mar-Vie)", description: "30-40 min con peso corporal + banda elástica", detail: "LUNES: bachata cuenta como entreno" },
  { time: "20:30 - 21:30", emoji: "💻", title: "PROGRAMACIÓN parte 1", description: "Freelance con Lautaro - 1h antes de cenar" },
  { time: "21:30 - 22:00", emoji: "🌙", title: "CENA", description: "Comida balanceada + proteína", detail: "Cena más liviana porque dormís en 1.5h" },
  { time: "22:00 - 23:30", emoji: "💻", title: "PROGRAMACIÓN parte 2", description: "1.5 horas de programación final", detail: "Cierre del día - cerrá todo a las 23:30" },
  { time: "23:30", emoji: "🌙", title: "DESCONEXIÓN RÁPIDA (20 min)", description: "Té relajante + estiramiento + respiración", detail: "CRÍTICO: te cuesta dormir. Sin pantallas." },
  { time: "23:50", emoji: "😴", title: "DORMIR", description: "7.5 horas hasta 7:30 AM", detail: "Habitación oscura, fresca" },
];

export const rocioChecklist: ChecklistItem[] = [
  // Mañana
  { key: "despertar", label: "Desperté 7:30 AM", category: "morning", time: "7:30" },
  { key: "agua_despertar", label: "2 vasos de agua al despertar", category: "morning" },
  { key: "desayuno_completo", label: "Desayuno completo", category: "morning", time: "8:00" },
  { key: "tupper_almuerzo", label: "Tupper preparado para almuerzo", category: "morning" },
  { key: "kit_oficina", label: "Botella agua + colación en mochila", category: "morning" },

  // Trabajo
  { key: "colacion_11", label: "Colación 11:00 (yogur o fruta)", category: "nutrition", time: "11:00" },
  { key: "almuerzo_limpio", label: "Almuerzo limpio (13:00)", category: "nutrition", time: "13:00" },
  { key: "mate_tarde", label: "Mate + agua durante la tarde", category: "nutrition" },

  // Post-trabajo
  { key: "merienda_casa", label: "Merienda 19:15 (Mar-Vie) / Bachata (Lun)", category: "post_work", time: "19:15" },
  { key: "entrenamiento", label: "Entrenamiento o bachata", category: "training", time: "19:30" },

  // Noche
  { key: "programacion_1", label: "Programación parte 1 (20:30 - 21:30)", category: "night" },
  { key: "cena_liviana", label: "Cena liviana (21:30 - 22:00)", category: "night", time: "21:30" },
  { key: "programacion_2", label: "Programación parte 2 (22:00 - 23:30)", category: "night" },
  { key: "desconexion", label: "Desconexión rápida 23:30", category: "night", time: "23:30" },
  { key: "te_relajante", label: "Té relajante", category: "night" },
  { key: "dormir", label: "Dormir 23:50", category: "night", time: "23:50" },

  // Objetivos del día
  { key: "calorias_2200", label: "Comí ~2200 kcal", category: "goals" },
  { key: "proteina_4_5_comidas", label: "Proteína en 4-5 comidas", category: "goals" },
  { key: "agua_2L", label: "2L+ de agua", category: "goals" },
  { key: "sueno_8h", label: "8h de sueño anoche", category: "goals" },
];

export const rocioWorkouts: WorkoutDay[] = [
  {
    day: "lunes",
    emoji: "💃",
    title: "BACHATA",
    focus: "Bachata · 19:00 - 20:00 · 1 hora",
    duration: "60 min",
    notes: "Ya es ejercicio cardio + coordinación. NO necesitás entreno extra hoy.",
    exercises: [
      {
        section: "Antes/Durante/Después",
        items: [
          { name: "PRE: 1 banana + agua", sets: "" },
          { name: "DURANTE: hidratación", sets: "" },
          { name: "POST: yogur + fruta o batido", sets: "" },
        ],
      },
    ],
  },
  {
    day: "martes",
    emoji: "🦵",
    title: "PIERNAS + GLÚTEOS",
    focus: "Tren inferior · Casa",
    duration: "30-40 min",
    warmup: [
      { name: "Marcha en el lugar", sets: "2 min" },
      { name: "Sentadillas suaves", sets: "15 repeticiones" },
    ],
    exercises: [
      {
        section: "Glúteos + Piernas",
        items: [
          { name: "Sentadillas profundas", sets: "4x12-15" },
          { name: "Puente de glúteos", sets: "4x15" },
          { name: "Estocadas alternadas", sets: "3x10 c/pierna" },
          { name: "Patada de glúteo (4 patas)", sets: "3x12 c/pierna" },
          { name: "Abducción con banda elástica", sets: "3x15 c/lado" },
          { name: "Sentadilla sumo (piernas abiertas)", sets: "3x12" },
        ],
      },
    ],
  },
  {
    day: "miercoles",
    emoji: "💪",
    title: "BRAZOS + ESPALDA",
    focus: "Tren superior · Casa",
    duration: "30 min",
    warmup: [
      { name: "Rotaciones de brazos", sets: "10 c/lado" },
      { name: "Marcha con brazos", sets: "2 min" },
    ],
    exercises: [
      {
        section: "Brazos + Espalda",
        items: [
          { name: "Flexiones de rodillas (apoyando rodillas)", sets: "3x8-10" },
          { name: "Flexiones inclinadas (manos en silla)", sets: "3x8-10" },
          { name: "Remo con banda elástica", sets: "4x12-15" },
          { name: "Curl bíceps con banda", sets: "3x12-15" },
          { name: "Patada tríceps con banda", sets: "3x12-15" },
          { name: "Apertura inversa con banda", sets: "3x12" },
        ],
      },
    ],
  },
  {
    day: "jueves",
    emoji: "🍑",
    title: "GLÚTEOS FOCUS",
    focus: "Cola al máximo",
    duration: "30 min",
    exercises: [
      {
        section: "Glúteos",
        items: [
          { name: "Hip thrust en suelo", sets: "4x15" },
          { name: "Hip thrust con 1 pierna", sets: "3x10 c/pierna" },
          { name: "Sentadilla búlgara (pie en silla)", sets: "3x10 c/pierna" },
          { name: "Patada de burro (4 patas)", sets: "3x15 c/pierna" },
          { name: "Caminata lateral con banda", sets: "3x10 pasos c/lado" },
          { name: "Puente con banda en rodillas", sets: "3x15" },
        ],
      },
    ],
  },
  {
    day: "viernes",
    emoji: "🧘",
    title: "CUERPO COMPLETO + CORE",
    focus: "Full body + abdominales",
    duration: "30 min",
    exercises: [
      {
        section: "Cuerpo Completo",
        items: [
          { name: "Sentadillas", sets: "3x12" },
          { name: "Flexiones de rodillas", sets: "3x8" },
          { name: "Remo con banda", sets: "3x12" },
          { name: "Estocadas", sets: "3x10 c/pierna" },
        ],
      },
      {
        section: "Core",
        items: [
          { name: "Plancha", sets: "3x20-30 seg" },
          { name: "Plancha lateral", sets: "3x15 seg c/lado" },
          { name: "Bicicleta abdominal", sets: "3x20" },
          { name: "Elevación de piernas", sets: "3x12" },
          { name: "Súperman", sets: "3x12" },
        ],
      },
    ],
  },
  {
    day: "sabado_domingo",
    emoji: "🛋️",
    title: "DESCANSO ACTIVO",
    focus: "Caminata + descanso (los músculos crecen acá)",
    duration: "30-60 min suave",
    exercises: [],
    notes: "Caminata, paseo, yoga suave o pilates. NO sedentaria todo el día.",
  },
];

export const rocioMeals = {
  desayuno: [
    { emoji: "🍳", name: "Clásico Power", description: "2 huevos revueltos + 2 tostadas + queso untable + 1 banana + café con leche", calories: 520, protein: 25 },
    { emoji: "🥣", name: "Avena Crece-Músculo", description: "Avena (4 cdas) con leche entera + 1 cda miel + banana + nueces + mate", calories: 550, protein: 18 },
    { emoji: "🍓", name: "Yogur Cargado", description: "2 yogures con sabor + granola + frutillas + miel + almendras", calories: 480, protein: 18 },
    { emoji: "🥤", name: "Licuado Express", description: "Banana + 1 medida proteína + leche entera + avena + 1 cda manteca de maní", calories: 580, protein: 35 },
  ] as MealOption[],
  colacion_manana: [
    { emoji: "🍌", name: "Banana + Almendras", description: "1 banana grande + puñado de almendras (15-20)", calories: 280, protein: 8 },
    { emoji: "🍓", name: "Yogur con Sabor", description: "1 yogur + 1 fruta (manzana o naranja)", calories: 220, protein: 6 },
    { emoji: "🥪", name: "Mini Sándwich", description: "1 tostada integral + jamón + queso dambo + tomate", calories: 250, protein: 14 },
  ] as MealOption[],
  almuerzo: [
    { emoji: "🍗", name: "Pollo + Arroz", description: "Pechuga (150g) + arroz integral + ensalada", calories: 550, protein: 38 },
    { emoji: "🥩", name: "Carne con Puré", description: "Bife (150g) o carne molida + puré + ensalada", calories: 600, protein: 40 },
    { emoji: "🐟", name: "Atún + Pasta", description: "Pasta integral + 1 lata atún + tomate + queso rallado", calories: 550, protein: 32 },
    { emoji: "🍲", name: "Guiso de Lentejas", description: "Lentejas + carne + zanahoria + cebolla + papa", calories: 580, protein: 30 },
    { emoji: "🍝", name: "Tallarines Bolognesa", description: "Tallarines + salsa con carne molida + queso", calories: 620, protein: 32 },
    { emoji: "🥗", name: "Bowl Pollo", description: "Pollo desmenuzado + arroz + huevo + tomate + queso dambo", calories: 590, protein: 42 },
  ] as MealOption[],
  merienda: [
    { emoji: "🧉", name: "Mate Tradicional", description: "Mate + 2 tostadas con queso dambo + 1 fruta", calories: 320, protein: 12 },
    { emoji: "🍓", name: "Yogur + Granola", description: "Yogur con sabor + granola + 1 banana", calories: 340, protein: 10 },
    { emoji: "🥪", name: "Sándwich + Té", description: "Pan integral + jamón + queso cheddar + lechuga + té", calories: 380, protein: 22 },
  ] as MealOption[],
  cena: [
    { emoji: "🍗", name: "Pollo + Verduras", description: "Pechuga (130g) + zapallo + zanahoria + papa al horno", calories: 480, protein: 35 },
    { emoji: "🍳", name: "Tortilla + Ensalada", description: "Tortilla 3 huevos + papa + cebolla + ensalada", calories: 460, protein: 22 },
    { emoji: "🥩", name: "Bife Liviano", description: "Bife (130g) + ensalada de espinaca, tomate + 1 papa hervida", calories: 470, protein: 36 },
    { emoji: "🌯", name: "Rollito Integral", description: "Rollito + pollo + queso cheddar + lechuga + tomate", calories: 490, protein: 30 },
    { emoji: "🍕", name: "Pizza Casera Light", description: "Base integral + tomate + mozzarella + jamón + tomate fresco + orégano", calories: 500, protein: 28 },
    { emoji: "🥚", name: "Revuelto Cargado", description: "3 huevos revueltos + espinaca + queso dambo + 1 tostada", calories: 470, protein: 28 },
  ] as MealOption[],
};
