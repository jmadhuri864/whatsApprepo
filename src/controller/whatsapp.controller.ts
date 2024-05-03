import { Request, Response, NextFunction } from "express";
//import wbm from 'wbm';
const wbm = require('wbm');
import { AppDataSource } from "../utils/data-source";
import { Cuisine } from "../entity/Cuisine.entity";
import { Dish } from "../entity/Dish.entity";
import { Ingredient } from "../entity/Ingredient.entity";

export const sendwhatsappMessageController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("in whatapp message controller")
        // Extract user-provided inputs from the request
        const { cuisineName, dishName, ingredientNames } = req.body;

        // Prepare the message based on user's selection
        //const message = await prepareMessage(cuisineName, dishName, ingredientNames);
        console.log("done done done ")
        // Send the message via WhatsApp
        const message ="good morning"
        await sendMessageToWhatsApp(message);

        // Return success response
        res.status(200).json({ message: 'Message sent successfully', data: { message } });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to send message via WhatsApp
async function sendMessageToWhatsApp(message: string) {
    try {
        console.log("Initialization wbm")
        // Initialize wbm
        await wbm.start();

        // Send message to a specific number or contact
        // await wbm.send(process.env.WHATSAPP_NUMBER, message);
        const whatsappNumber = ['7030629160'];
        console.log("sending message")
        await wbm.send(whatsappNumber, message);
console.log("message sended")
        // Close wbm session
        await wbm.end();
        console.log("Message sent successfully");
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

// Function to fetch and format data based on user selection
async function prepareMessage(selectedCuisineName: string, selectedDishName: string, selectedIngredientNames: string[]) {
    try {
        // Connect to the database
        const cuisineRepository = AppDataSource.getRepository(Cuisine);
        const dishRepository = AppDataSource.getRepository(Dish);
        const ingredientRepository = AppDataSource.getRepository(Ingredient);

        // Fetch selected cuisine data
        const selectedCuisine = await cuisineRepository.findOne({ where: { name: selectedCuisineName }, relations: ['dishes'] });

        if (!selectedCuisine) {
            throw new Error(`Cuisine "${selectedCuisineName}" not found`);
        }

        // Find the selected dish within the selected cuisine
        const selectedDish = selectedCuisine.dishes.find((dish) => dish.name === selectedDishName);

        if (!selectedDish) {
            throw new Error(`Dish "${selectedDishName}" not found in ${selectedCuisineName}`);
        }

        // Fetch ingredients for the selected dish
        const ingredients = await ingredientRepository.find({ where: { dish: selectedDish }, relations: ['quantities'] });

        // Format the message for the selected dish and ingredients
        let message = `Selected Dish: ${selectedDishName}\n`;
        ingredients.forEach((ingredient) => {
            if (selectedIngredientNames.includes(ingredient.name)) {
                message += `- ${ingredient.name}: `;
                const quantity = ingredient.quantities.find((q) => q.ingredient.id === ingredient.id);
                if (quantity) {
                    message += `${quantity.quantity} ${quantity.units}\n`;
                }
            }
        });

        return message;
    } catch (error) {
        console.error('Error preparing message:', error);
        throw error;
    }
}
