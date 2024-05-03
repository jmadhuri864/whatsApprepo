import { Dish } from "../entity/Dish.entity";
import { AppDataSource } from "../utils/data-source";

const dishRepository = AppDataSource.getRepository(Dish);


export const IngredientsByDishId  = async (dishId:string) => {
    try {
        const dish = await dishRepository.findOne({where : {id :dishId}, 
             relations: ['ingredients'] }); 
             if (!dish) {
                throw new Error('Dish not found');
            }
        return dish;
    } catch (error) {
        console.error('Error creating cuisine:', error);
        throw error;
    }
};
