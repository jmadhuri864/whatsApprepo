// cuisine.repository.ts
import { DeepPartial} from 'typeorm';
import { Cuisine } from '../entity/Cuisine.entity';
import { Dish } from '../entity/Dish.entity';
import { Ingredient } from '../entity/Ingredient.entity';
import { AppDataSource } from '../utils/data-source';


const cuisineRepository = AppDataSource.getRepository(Cuisine);
const dishRepository = AppDataSource.getRepository(Dish);
const ingredientRepository = AppDataSource.getRepository(Ingredient);


export const createCuisine = async (input: DeepPartial<Cuisine>) => {
    try {
        // Create a new Cuisine entity
        const cuisine = new Cuisine();
        if (!input.name) {
            throw new Error('Cuisine name is required');
        }
        cuisine.name = input.name;
        cuisine.dishes = [];
        //dish.ingredients = []; 

        // Create and associate dishes with the cuisine
        if (input.dishes) {
            for (const dishData of input.dishes) {
                const dish = new Dish();
                dish.name = dishData.name!;
                dish.ingredients = []; 
                // Create and associate ingredients with the dish
                if (dishData.ingredients) {
                    dish.ingredients = [];
                    for (const ingredientData of dishData.ingredients) {
                        const ingredient = new Ingredient();
                        ingredient.name = ingredientData.name!;
                       
                        await ingredientRepository.save(ingredient);
                        dish.ingredients.push(ingredient);
                    }
                }

                await dishRepository.save(dish);
                cuisine.dishes.push(dish);
            }
        }

        // Save the Cuisine entity to the database
        const savedCuisine =  await cuisineRepository.save(cuisine);
// Fetch and return the IDs of the dishes and ingredients
const cuisineWithIDs = await cuisineRepository.findOne({where : {id :savedCuisine.id}, 
     relations: ['dishes', 'dishes.ingredients'] });

return cuisineWithIDs;
       // return cuisine;
    } catch (error) {
        console.error('Error creating cuisine:', error);
        throw error;
    }
};



export const getDishesByCuisineName = async (cuisineName: string) => {
    try {
      //const cuisineRepository = getRepository(Cuisine);
      const cuisine = await cuisineRepository.findOne({ where: { name: cuisineName }, relations: ['dishes'] });
      return cuisine?.dishes ?? [];
    } catch (error) {
      console.error('Error fetching dishes by cuisine name:', error);
      throw error;
    }
  };