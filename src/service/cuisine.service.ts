// cuisine.repository.ts

import { DeepPartial, getConnection} from 'typeorm';
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
                // Check if the cuisine already exists
                let cuisine = await cuisineRepository.findOne({ where: { name: cuisineData.name }, relations: ['dishes'] });

                if (!cuisine) {
                    // If cuisine doesn't exist, create it
                    cuisine = cuisineRepository.create({
                        name: cuisineData.name,
                        dishes: [],
                    });
                }

                for (const dishData of cuisineData.dishes) {
                    if (dishData && dishData.ingredients) {
                        let dish = cuisine.dishes.find(dish => dish.name === dishData.name);

                        if (!dish) {
                            // If dish doesn't exist, create it
                            dish = dishRepository.create({
                                name: dishData.name,
                                cuisine,
                                ingredients: [],
                            });
                            cuisine.dishes.push(dish);
                        }

                        // Loop through ingredients data
                        for (const ingredientData of dishData.ingredients) {
                            if (ingredientData.name && typeof ingredientData.name === 'string') {
                                // Find or create the ingredient
                                let ingredient = await ingredientRepository.findOne({ where: { name: ingredientData.name } });

                                if (!ingredient) {
                                    ingredient = ingredientRepository.create({
                                        name: ingredientData.name,
                                        // Assign dish ID to the ingredient
                                        dish: dish,
                                    });
                                }

                                // Push the ingredient to the dish
                                dish.ingredients.push(ingredient);
                            } else {
                                console.error('Invalid ingredient name:', ingredientData.name);
                            }
                        }

                        await dishRepository.save(dish);
                    } else {
                        console.error('Invalid dish data:', dishData);
                    }
                }

                cuisinesToSave.push(cuisine);
            }
        }

        await cuisineRepository.save(cuisinesToSave);
        console.log('Data inserted or updated successfully');
    } catch (error) {
        console.error('Error inserting or updating data:', error);
        throw error;
    }
};


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