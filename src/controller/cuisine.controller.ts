// cuisine.controller.ts
import { NextFunction, Request, Response } from 'express';
import { CreateCuisineInput, createCuisineSchema } from '../schemas/cuisine.schema';
import { createCuisine, getDishesByCuisineName } from '../service/cuisine.service';


export const createCuisineController = 
async (
    req: Request<{}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const inputData = req.body;
        console.log("in create cuisine",inputData)
        // Call repository function to create cuisine
        const cuisine = await createCuisine(inputData);

        res.status(201).json({
            status:'success',
            data:{cuisine}});
    } catch (error) {
        console.error('Error creating cuisine:', error);
        res.status(400).json({error});
    }
};




export const getDishesByCuisineNameController = 
async (
    req: Request<{ cuisineName: string}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
        console.log("in cusine get dish controller")
        const  {cuisineName} = req.params; // Assuming cuisineName is passed as a URL parameter
        console.log(cuisineName)
        const dishes = await getDishesByCuisineName(cuisineName);
    
        if (dishes.length === 0) {
          return res.status(404).json({ message: 'Cuisine not found' });
        }
    
        return res.status(200).json(dishes);
      } catch (error) {
        console.error('Error fetching dishes by cuisine name:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }