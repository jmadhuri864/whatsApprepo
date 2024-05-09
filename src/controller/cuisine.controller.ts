// cuisine.controller.ts
import { NextFunction, Request, Response } from 'express';
import { CreateCuisineInput, createCuisineSchema } from '../schemas/cuisine.schema';
import { createCuisine, getCuisines, getDishesByCuisineName } from '../service/cuisine.service';
import { getRepository } from 'typeorm';
import { AppDataSource } from '../utils/data-source';
import { Cuisine } from '../entity/Cuisine.entity';
import path from 'path';
import fs from 'fs';


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



    
