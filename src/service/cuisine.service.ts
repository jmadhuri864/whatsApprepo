// cuisine.repository.ts

import { DeepPartial} from 'typeorm';
import { Cuisine } from '../entity/Cuisine.entity';
import { Dish } from '../entity/Dish.entity';
import { Ingredient } from '../entity/Ingredient.entity';
import { AppDataSource } from '../utils/data-source';
//const data = require('./data.json');

const cuisineRepository = AppDataSource.getRepository(Cuisine);
const dishRepository = AppDataSource.getRepository(Dish);
const ingredientRepository = AppDataSource.getRepository(Ingredient);

export const createCuisine = async (inputs: DeepPartial<Cuisine>[]) => {
    try {
        const cuisinesToSave: Cuisine[] = [];

        for (const cuisineData of inputs) {
            if (cuisineData && cuisineData.dishes) {
                const cuisine = cuisineRepository.create({
                    name: cuisineData.name,
                    dishes: [],
                });

                for (const dishData of cuisineData.dishes) {
                    const dish = dishRepository.create({
                        name: dishData.name,
                        cuisine,
                        ingredients: [], // Initialize ingredients array
                    });

                    if (dishData.ingredients) {
                        for (const ingredientData of dishData.ingredients) {
                            const ingredient = ingredientRepository.create({
                                name: ingredientData.name,
                            });

                            // Associate ingredient with dish
                            dish.ingredients.push(ingredient);
                        }
                    } else {
                        console.warn(`Ingredients data is missing for dish: ${dishData.name}`);
                    }

                    await dishRepository.save(dish);
                    cuisine.dishes.push(dish);
                }

                cuisinesToSave.push(cuisine);
            }
        }

        await cuisineRepository.save(cuisinesToSave);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    }
}


export const getCuisines = async () => {
    try {
      //const cuisineRepository = AppDataSource.getRepository(Cuisine);
      const cuisines = await cuisineRepository.find({ relations: ['dishes','dishes.ingredients'] });
      return cuisines;
    } catch (error) {
      console.error('Error fetching cuisines:', error);
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