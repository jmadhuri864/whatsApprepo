import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";

import { orderemailController } from "../controller/email.controller";
//import { sendMessageController } from "../controller/whatsapp.controller";


const router = express.Router();

//router.use(deserializeUser, requireUser);



router.post('/send-order-email', orderemailController);


export default router;
