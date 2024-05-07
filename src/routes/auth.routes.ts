import express from 'express';

import {
  loginUserHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
} from '../controller/Auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createUserSchema,  loginUserSchema} from '../schemas/user.schema';






const router = express.Router();
//router.use(deserializeUser, requireUser);

router.post('/signup',validate(createUserSchema),registerUserHandler);
router.post('/login',validate(loginUserSchema),loginUserHandler);

export default router;
