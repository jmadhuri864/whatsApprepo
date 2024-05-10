import express from "express";

import {
  createCuisineController,
  getCuisinesController,
} from "../controller/cuisine.controller";

const router = express.Router();

router.post("/createCuisines", createCuisineController);

router.get("/getCuisines", getCuisinesController);

export default router;
