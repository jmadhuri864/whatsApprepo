import express from "express";

import {  createCuisineController, getCuisinesController, getDishesByCuisineNameController } from "../controller/cuisine.controller";
import { getIngredientsByDishId } from "../controller/ingredient.controller";
//import { saveQuantityforIngredientHandler } from "../controller/quantity.controller";

//import { sendMessageController } from "../controller/whatsapp.controller";


const router = express.Router();

//router.use(deserializeUser, requireUser);



router.post('/createCuisines', createCuisineController);
router.get('/getIngredientsByDishId/:dishId',getIngredientsByDishId );
router.get('/getDishesByCuisineName/:cuisineName',getDishesByCuisineNameController);
//router.post('/addQuantityForIngredients/:ingredientId',saveQuantityforIngredientHandler);
//router.post('/sendmsgfromwp',sendwhatsappMessageController );
//router.get('/CuisineNameWithDishAndIngre',CuisineNameWithDishAndIngreController);
router.get('/getCuisines',getCuisinesController)

export default router;
