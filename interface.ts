interface Ingredient {
    id: string;
    name: string;
}

interface Dish {
    id: string;
    name: string;
    ingredients: Ingredient[];
}

interface Cuisine {
    id: string;
    name: string;
    dishes: Dish[];
}

interface RestaurantData {
    data: Cuisine[];
}

export { RestaurantData, Cuisine, Dish, Ingredient };
