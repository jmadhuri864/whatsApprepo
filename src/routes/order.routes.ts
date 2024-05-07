import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { createCuisineSchema } from "../schemas/cuisine.schema";
import { createCuisineController, getDishesByCuisineNameController } from "../controller/cuisine.controller";
import { getIngredientsByDishId } from "../controller/ingredient.controller";
import { saveQuantityforIngredientHandler } from "../controller/quantity.controller";
import { sendwhatsappMessageController } from "../controller/whatsapp.controller";
import { orderemailController } from "../controller/email.controller";
//import { sendMessageController } from "../controller/whatsapp.controller";


const router = express.Router();

router.use(deserializeUser, requireUser);



router.post('/send-order-email', orderemailController);


export default router;
