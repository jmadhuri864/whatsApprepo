import { Ingredient } from "../entity/Ingredient.entity";
import { Quantity } from "../entity/quantity.entity";
import { AppDataSource } from "../utils/data-source";

const ingredientRepository = AppDataSource.getRepository(Ingredient);
    const quantityRepository = AppDataSource.getRepository(Quantity);



    export const addQuantityforingre = async (ingredientId: string, quantity: number, units: string): Promise<Quantity> =>
         {
        const ingredient = await ingredientRepository.findOneOrFail({ where: { id: ingredientId } });
    const newQuantity = new Quantity();
    newQuantity.quantity = quantity;
    newQuantity.units = units;
    newQuantity.ingredient = ingredient;

    return await quantityRepository.save(newQuantity);
  }

      ;