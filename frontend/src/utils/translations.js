export const categoryLabels = {
  All: "Todo",
  Salad: "Ensaladas",
  Rolls: "Rollos",
  Deserts: "Postres",
  Sandwich: "Bocadillos",
  Cake: "Pasteles",
  "Pure Veg": "Vegetariano",
  Pasta: "Pastas",
  Noodles: "Fideos",
};

export const translateCategory = (category) =>
  categoryLabels[category] || category;

export const translateName = (name) => {
  const names = {
    "Greek salad": "Ensalada griega",
    "Veg salad": "Ensalada vegetariana",
    "Clover Salad": "Ensalada Clover",
    "Chicken Salad": "Ensalada de pollo",
    "Lasagna Rolls": "Rollos de lasaña",
    "Peri Peri Rolls": "Rollos Peri Peri",
    "Chicken Rolls": "Rollos de pollo",
    "Veg Rolls": "Rollos vegetarianos",
    "Ripple Ice Cream": "Helado Ripple",
    "Fruit Ice Cream": "Helado de frutas",
    "Jar Ice Cream": "Helado en tarro",
    "Vanilla Ice Cream": "Helado de vainilla",
    "Chicken Sandwich": "Bocadillo de pollo",
    "Vegan Sandwich": "Bocadillo vegano",
    "Grilled Sandwich": "Bocadillo tostado",
    "Bread Sandwich": "Bocadillo de pan",
    "Cup Cake": "Magdalena",
    "Vegan Cake": "Pastel vegano",
    "Butterscotch Cake": "Pastel de caramelo",
    "Sliced Cake": "Porción de pastel",
    "Garlic Mushroom": "Setas al ajillo",
    "Fried Cauliflower": "Coliflor frita",
    "Mix Veg Pulao": "Arroz pilaf de verduras",
    "Rice Zucchini": "Arroz con calabacín",
    "Cheese Pasta": "Pasta con queso",
    "Tomato Pasta": "Pasta con tomate",
    "Creamy Pasta": "Pasta cremosa",
    "Chicken Pasta": "Pasta con pollo",
    "Buttter Noodles": "Fideos con mantequilla",
    "Veg Noodles": "Fideos vegetarianos",
    "Somen Noodles": "Fideos somen",
    "Cooked Noodles": "Fideos cocidos",
  };
  return names[name] || name;
};

export const translateDescription = (description) =>
  description === "Food provides essential nutrients for overall health and well-being"
    ? "Los alimentos aportan nutrientes esenciales para la salud y el bienestar general"
    : description;
