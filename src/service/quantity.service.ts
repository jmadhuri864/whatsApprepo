import { Ingredient } from "../entity/Ingredient.entity";
import { Quantity } from "../entity/quantity.entity";

import { AppDataSource } from "../utils/data-source";

const ingredientRepository = AppDataSource.getRepository(Ingredient);
const quantityRepository = AppDataSource.getRepository(Quantity);

export const addQuantityforIngredient = async (ingredientId: string, quantity: number, units: string): Promise<Quantity> =>
     {
    try {
        // Fetch the selected ingredient
        const ingredient = await ingredientRepository.findOne({ where: { id: ingredientId } });

        if (!ingredient) {
            throw new Error('Ingredient not found');
        }

        // Create Quantity entity and associate it with the selected ingredient
        const newQuantity = quantityRepository.create({ quantity, units, ingredient });
        await quantityRepository.save(newQuantity);

        return newQuantity;
    } catch (error) 
    {
        console.error('Error creating quantity:', error);
        throw error;
    }
}
