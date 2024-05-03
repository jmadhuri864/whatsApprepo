import { NextFunction ,Request,Response} from "express";
import { IngredientsByDishId } from "../service/dish.service";

export const getIngredientsByDishId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      const dishId = req.params.dishId;
      const dish = await IngredientsByDishId(dishId);
      if (!dish) {
          return res.status(404).json({ error: 'Dish not found' });
      }
      // res.status(200).json(dish.ingredients);
      res.status(200).json({
          status: 'success',
          data: { ingredients: dish.ingredients }
      });
  } catch (error) {
      console.error('Error fetching ingredients:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};