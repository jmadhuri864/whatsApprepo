import { object, string, array, TypeOf, z } from 'zod';

export const createCuisineSchema = object({
    name: string().nonempty('Cuisine name is required'),
    dishes: array(
        object({
            name: string().nonempty('Dish name is required'),
            ingredients: array(
                object({
                    name: string().nonempty('Ingredient name is required'),
                    quantity: z.number().min(0, { message: 'Quantity must be a positive number' }),
                    units: string().nonempty('Units are required'),
                })
            ),
        })
    ),
});

export type CreateCuisineInput = TypeOf<typeof createCuisineSchema>;
