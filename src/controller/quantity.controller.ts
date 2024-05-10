// import { NextFunction,Request,Response } from "express";


// export const saveQuantityforIngredientHandler = async (
//     req: Request<{ingredientId:string,name:string}, {}, { quantity: number; units: string }>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       console.log("in add quantity controller")
//       const { ingredientId } = req.params;
//       const { quantity, units } = req.body;
      
      
//       const addedQuantity = await addQuantityforingre(ingredientId, quantity, units);
//       res.status(201).json({ message: 'Quantity added successfully', addedQuantity });
//     } catch (error) {
//       console.error('Error adding quantity:', error);
//       res.status(400).json({ message: 'Bad request' });
//     }
//   }
