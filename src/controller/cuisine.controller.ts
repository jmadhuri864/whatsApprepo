// cuisine.controller.ts
import { NextFunction, Request, Response } from 'express';

import { createCuisine, getCuisines, getDishesByCuisineName } from '../service/cuisine.service';



export const createCuisineController = 
async (
    req: Request<{}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const data =req.body;

    // Call the createCuisine function from the repository with data from data.json
   const newdata= await createCuisine(data);

        res.status(201).json({
            status:'success',
            newdata});
    } catch (error) {
        console.error('Error creating cuisine:', error);
        res.status(400).json({error});
    }
};


export const getCuisinesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("controller")
    const cuisines = await getCuisines();
    res.status(200).json({ status: 'success', data: cuisines });
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};




    
