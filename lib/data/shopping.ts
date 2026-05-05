// Lista de compras semanal - estructurada por categoría

export type ShoppingCategory =
  | "proteinas"
  | "carbohidratos"
  | "verduras"
  | "frutas"
  | "lacteos"
  | "almacen";

export interface ShoppingItem {
  key: string;
  emoji: string;
  label: string;
  quantity: string;
  note: string;
  category: ShoppingCategory;
  estimatedPrice: number; // ARS
}

export const categoryMeta: Record<ShoppingCategory, { emoji: string; label: string; order: number }> = {
  proteinas: { emoji: "🥩", label: "Proteínas", order: 1 },
  carbohidratos: { emoji: "🌾", label: "Carbohidratos", order: 2 },
  verduras: { emoji: "🥗", label: "Verduras", order: 3 },
  frutas: { emoji: "🍎", label: "Frutas", order: 4 },
  lacteos: { emoji: "🥛", label: "Lácteos", order: 5 },
  almacen: { emoji: "🥫", label: "Almacén", order: 6 },
};

// LAUTARO/TATARO: cantidades x2 (comparte con su papá)
export const lautaroShoppingList: ShoppingItem[] = [
  // PROTEÍNAS
  { key: "pollo_pechuga", emoji: "🍗", label: "Pechuga de pollo", quantity: "1 kg", note: "Lunes almuerzo + cena", category: "proteinas", estimatedPrice: 6500 },
  { key: "carne_molida", emoji: "🥩", label: "Carne molida", quantity: "1 kg", note: "Martes + Jueves bolognesa", category: "proteinas", estimatedPrice: 7000 },
  { key: "milanesas", emoji: "🥩", label: "Milanesas (pollo o carne)", quantity: "500g (8-10 piezas)", note: "Miércoles almuerzo", category: "proteinas", estimatedPrice: 8000 },
  { key: "bife", emoji: "🥩", label: "Bife de chorizo o cuadril", quantity: "500g", note: "Viernes almuerzo", category: "proteinas", estimatedPrice: 9000 },
  { key: "huevos", emoji: "🥚", label: "Huevos", quantity: "30 unidades (1 maple)", note: "Desayunos + tortillas + snacks", category: "proteinas", estimatedPrice: 5500 },
  { key: "jamon_cocido", emoji: "🥓", label: "Jamón cocido", quantity: "400g", note: "Sándwiches + meriendas", category: "proteinas", estimatedPrice: 6500 },

  // CARBOHIDRATOS
  { key: "arroz_blanco", emoji: "🍚", label: "Arroz blanco", quantity: "2 kg", note: "Lunes + sobrante", category: "carbohidratos", estimatedPrice: 3500 },
  { key: "arroz_integral", emoji: "🍚", label: "Arroz integral", quantity: "1 kg", note: "Viernes + cenas", category: "carbohidratos", estimatedPrice: 4000 },
  { key: "pasta", emoji: "🍝", label: "Pasta integral (tallarines)", quantity: "1 kg", note: "Jueves bolognesa", category: "carbohidratos", estimatedPrice: 3000 },
  { key: "avena", emoji: "🥣", label: "Avena", quantity: "1 kg", note: "Desayunos + licuados", category: "carbohidratos", estimatedPrice: 2500 },
  { key: "pan_integral", emoji: "🍞", label: "Pan integral en rebanadas", quantity: "2 paquetes (1 kg)", note: "Tostadas, desayunos", category: "carbohidratos", estimatedPrice: 5000 },
  { key: "pan_molde", emoji: "🥖", label: "Pan de molde o miñones", quantity: "2 paquetes", note: "Sándwiches", category: "carbohidratos", estimatedPrice: 4000 },

  // VERDURAS
  { key: "lechuga", emoji: "🥬", label: "Lechuga", quantity: "2 matas", note: "Ensaladas L, M, X", category: "verduras", estimatedPrice: 2500 },
  { key: "tomate", emoji: "🍅", label: "Tomate", quantity: "12-15 unidades", note: "Ensaladas + sándwiches", category: "verduras", estimatedPrice: 3500 },
  { key: "zanahoria", emoji: "🥕", label: "Zanahoria", quantity: "1 kg", note: "Ensaladas + wok viernes", category: "verduras", estimatedPrice: 1500 },
  { key: "cebolla", emoji: "🧅", label: "Cebolla", quantity: "1 kg (8-10)", note: "Carne molida, tortilla, salsas", category: "verduras", estimatedPrice: 1500 },
  { key: "papa", emoji: "🥔", label: "Papa", quantity: "2 kg", note: "Martes puré + miércoles horno", category: "verduras", estimatedPrice: 2500 },
  { key: "zapallo", emoji: "🎃", label: "Zapallo", quantity: "1 grande", note: "Viernes wok + sopas", category: "verduras", estimatedPrice: 2000 },
  { key: "choclo", emoji: "🌽", label: "Choclo", quantity: "4 unidades o 2 latas", note: "Viernes wok", category: "verduras", estimatedPrice: 2500 },
  { key: "espinaca", emoji: "🥬", label: "Espinaca", quantity: "2 atados", note: "Ensaladas + viernes wok", category: "verduras", estimatedPrice: 2000 },
  { key: "ajo", emoji: "🧄", label: "Ajo", quantity: "2 cabezas", note: "Salsas, condimento", category: "verduras", estimatedPrice: 1000 },

  // FRUTAS
  { key: "banana", emoji: "🍌", label: "Banana", quantity: "2 docenas", note: "Desayuno + post-entreno + snacks", category: "frutas", estimatedPrice: 4000 },
  { key: "manzana", emoji: "🍎", label: "Manzana", quantity: "10-12", note: "Meriendas + colaciones", category: "frutas", estimatedPrice: 4000 },
  { key: "naranja", emoji: "🍊", label: "Naranja", quantity: "8", note: "Snacks + jugo", category: "frutas", estimatedPrice: 2500 },
  { key: "frutilla", emoji: "🍓", label: "Frutilla (si hay)", quantity: "500g", note: "Yogur, desayuno", category: "frutas", estimatedPrice: 4000 },

  // LÁCTEOS
  { key: "leche", emoji: "🥛", label: "Leche entera o descremada", quantity: "2 litros", note: "Café + licuados + avena", category: "lacteos", estimatedPrice: 3500 },
  { key: "yogur_sabor", emoji: "🍓", label: "Yogur con sabor", quantity: "12-14 potes", note: "Meriendas + snacks", category: "lacteos", estimatedPrice: 6500 },
  { key: "queso_dambo", emoji: "🧀", label: "Queso dambo", quantity: "500g", note: "Sándwiches + tostadas", category: "lacteos", estimatedPrice: 7000 },
  { key: "queso_cheddar", emoji: "🟡", label: "Queso cheddar", quantity: "300g", note: "Sándwiches especiales", category: "lacteos", estimatedPrice: 5500 },
  { key: "queso_untable", emoji: "🧀", label: "Queso untable", quantity: "2 potes", note: "Desayunos", category: "lacteos", estimatedPrice: 4000 },
  { key: "queso_rallado", emoji: "🧀", label: "Queso rallado", quantity: "1 paquete", note: "Pasta jueves", category: "lacteos", estimatedPrice: 2500 },

  // ALMACÉN
  { key: "salsa_tomate", emoji: "🥫", label: "Pulpa o salsa de tomate", quantity: "4 potes", note: "Bolognesa + milanesa al horno", category: "almacen", estimatedPrice: 4000 },
  { key: "aceite_oliva", emoji: "🫒", label: "Aceite de oliva", quantity: "1 botella (si necesita)", note: "Ensaladas, cocción", category: "almacen", estimatedPrice: 6000 },
  { key: "frutos_secos", emoji: "🥜", label: "Almendras / nueces / mix", quantity: "400g", note: "Kit anti-chatarra trabajo", category: "almacen", estimatedPrice: 7000 },
  { key: "yerba", emoji: "🧉", label: "Yerba mate", quantity: "1 kg", note: "Meriendas", category: "almacen", estimatedPrice: 4500 },
  { key: "cafe", emoji: "☕", label: "Café molido", quantity: "500g", note: "Desayunos", category: "almacen", estimatedPrice: 5000 },
  { key: "miel", emoji: "🍯", label: "Miel", quantity: "1 frasco", note: "Avena, yogur", category: "almacen", estimatedPrice: 3500 },
];

// ROCÍO/OZIO: cantidades para 1 persona
export const rocioShoppingList: ShoppingItem[] = [
  // PROTEÍNAS
  { key: "pollo_pechuga", emoji: "🍗", label: "Pechuga de pollo", quantity: "500g", note: "Almuerzos + cenas", category: "proteinas", estimatedPrice: 3500 },
  { key: "carne_molida", emoji: "🥩", label: "Carne molida", quantity: "400g", note: "Almuerzo + bolognesa", category: "proteinas", estimatedPrice: 3000 },
  { key: "bife", emoji: "🥩", label: "Bife o carne magra", quantity: "300g", note: "Almuerzo o cena", category: "proteinas", estimatedPrice: 4500 },
  { key: "atun_lata", emoji: "🐟", label: "Atún en lata", quantity: "3 latas", note: "Almuerzo + ensaladas", category: "proteinas", estimatedPrice: 4500 },
  { key: "huevos", emoji: "🥚", label: "Huevos", quantity: "12 unidades", note: "Desayunos + tortillas", category: "proteinas", estimatedPrice: 2500 },
  { key: "jamon_cocido", emoji: "🥓", label: "Jamón cocido", quantity: "200g", note: "Sándwiches + meriendas", category: "proteinas", estimatedPrice: 3500 },
  { key: "lentejas", emoji: "🟤", label: "Lentejas", quantity: "500g", note: "Guiso", category: "proteinas", estimatedPrice: 1500 },

  // CARBOHIDRATOS
  { key: "arroz_blanco", emoji: "🍚", label: "Arroz blanco o integral", quantity: "1 kg", note: "Almuerzos", category: "carbohidratos", estimatedPrice: 2000 },
  { key: "pasta", emoji: "🍝", label: "Pasta integral", quantity: "500g", note: "Bolognesa", category: "carbohidratos", estimatedPrice: 1500 },
  { key: "avena", emoji: "🥣", label: "Avena", quantity: "500g", note: "Desayunos potentes", category: "carbohidratos", estimatedPrice: 1500 },
  { key: "pan_integral", emoji: "🍞", label: "Pan integral", quantity: "1 paquete", note: "Tostadas, sándwiches", category: "carbohidratos", estimatedPrice: 2500 },
  { key: "wraps", emoji: "🌯", label: "Rollitos integrales (wraps)", quantity: "1 paquete", note: "Cenas rápidas", category: "carbohidratos", estimatedPrice: 2500 },
  { key: "granola", emoji: "🥣", label: "Granola", quantity: "500g", note: "Yogur con sabor + desayunos", category: "carbohidratos", estimatedPrice: 3500 },

  // VERDURAS
  { key: "lechuga", emoji: "🥬", label: "Lechuga", quantity: "1 mata", note: "Ensaladas", category: "verduras", estimatedPrice: 1200 },
  { key: "tomate", emoji: "🍅", label: "Tomate", quantity: "6 unidades", note: "Ensaladas + sándwiches", category: "verduras", estimatedPrice: 1800 },
  { key: "zanahoria", emoji: "🥕", label: "Zanahoria", quantity: "500g", note: "Ensaladas + cocción", category: "verduras", estimatedPrice: 800 },
  { key: "cebolla", emoji: "🧅", label: "Cebolla", quantity: "500g", note: "Cocción", category: "verduras", estimatedPrice: 800 },
  { key: "papa", emoji: "🥔", label: "Papa", quantity: "1 kg", note: "Puré, horno, hervida", category: "verduras", estimatedPrice: 1500 },
  { key: "zapallo", emoji: "🎃", label: "Zapallo", quantity: "1 mediano", note: "Cenas + sopas", category: "verduras", estimatedPrice: 1500 },
  { key: "espinaca", emoji: "🥬", label: "Espinaca", quantity: "1 atado", note: "Ensaladas + cenas", category: "verduras", estimatedPrice: 1000 },
  { key: "ajo", emoji: "🧄", label: "Ajo", quantity: "1 cabeza", note: "Condimento", category: "verduras", estimatedPrice: 500 },

  // FRUTAS
  { key: "banana", emoji: "🍌", label: "Banana", quantity: "1 docena", note: "Desayunos + bachata + snacks", category: "frutas", estimatedPrice: 2000 },
  { key: "manzana", emoji: "🍎", label: "Manzana", quantity: "6", note: "Colación oficina", category: "frutas", estimatedPrice: 2000 },
  { key: "naranja", emoji: "🍊", label: "Naranja", quantity: "4", note: "Colación oficina", category: "frutas", estimatedPrice: 1500 },
  { key: "frutilla", emoji: "🍓", label: "Frutilla", quantity: "250g", note: "Yogur con sabor", category: "frutas", estimatedPrice: 2500 },

  // LÁCTEOS
  { key: "leche", emoji: "🥛", label: "Leche entera", quantity: "1 litro", note: "Café, licuados, avena", category: "lacteos", estimatedPrice: 1800 },
  { key: "yogur_sabor", emoji: "🍓", label: "Yogur con sabor", quantity: "8 potes", note: "Desayunos + meriendas + snacks", category: "lacteos", estimatedPrice: 4000 },
  { key: "queso_dambo", emoji: "🧀", label: "Queso dambo", quantity: "300g", note: "Sándwiches + tostadas", category: "lacteos", estimatedPrice: 4500 },
  { key: "queso_cheddar", emoji: "🟡", label: "Queso cheddar", quantity: "200g", note: "Wraps, sándwiches", category: "lacteos", estimatedPrice: 4000 },
  { key: "queso_untable", emoji: "🧀", label: "Queso untable", quantity: "1 pote", note: "Desayunos", category: "lacteos", estimatedPrice: 2000 },

  // ALMACÉN
  { key: "salsa_tomate", emoji: "🥫", label: "Salsa de tomate", quantity: "2 potes", note: "Bolognesa", category: "almacen", estimatedPrice: 2000 },
  { key: "aceite_oliva", emoji: "🫒", label: "Aceite de oliva", quantity: "si necesita", note: "Ensaladas", category: "almacen", estimatedPrice: 6000 },
  { key: "frutos_secos", emoji: "🥜", label: "Almendras o nueces", quantity: "200g", note: "Colaciones oficina", category: "almacen", estimatedPrice: 4000 },
  { key: "yerba", emoji: "🧉", label: "Yerba mate", quantity: "500g", note: "Meriendas + tarde", category: "almacen", estimatedPrice: 2500 },
  { key: "cafe", emoji: "☕", label: "Café", quantity: "250g", note: "Desayunos + oficina", category: "almacen", estimatedPrice: 3500 },
  { key: "te_relajante", emoji: "🍵", label: "Té relajante (manzanilla, tilo, valeriana)", quantity: "1 caja", note: "Desconexión nocturna", category: "almacen", estimatedPrice: 2500 },
  { key: "miel", emoji: "🍯", label: "Miel", quantity: "1 frasco", note: "Avena, yogur, té", category: "almacen", estimatedPrice: 3500 },
  { key: "manteca_mani", emoji: "🥜", label: "Manteca de maní", quantity: "1 frasco chico", note: "Licuados desayuno", category: "almacen", estimatedPrice: 4500 },
  { key: "proteina_polvo", emoji: "💪", label: "Proteína en polvo (whey)", quantity: "si tiene", note: "Licuados post-entreno", category: "almacen", estimatedPrice: 25000 },
];
