import * as dotenv from "dotenv";
dotenv.config(); 
import express, { NextFunction, Request, Response } from "express";
import config from 'config';
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import validateEnv from './utils/validateEnv';
import { AppDataSource } from './utils/data-source';
import authRouter from "./routes/auth.routes";
import cuisinesRouter from './routes/cuisine.routes'
import orderRouter from'./routes/order.routes';
import redisClient from './utils/connectRedis';
import AppError from "./utils/appError";

AppDataSource.initialize()
  .then(async () => {
    // VALIDATE ENV
    validateEnv();

    const app = express();

    // MIDDLEWARE
// TEMPLATE ENGINE
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
    // 1. Body parser
    app.use(express.json({ limit: "10kb" }));
    // 2. Logger
    if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
    // 3. Cookie Parser
    app.use(cookieParser());
    // 4. Cors
    app.use(
        cors({
          //origin: config.get<string>("origin"),
          //origin:'http://localhost:3000/dashboard',
          //origin:'https://8ae4-163-53-201-67.ngrok-free.app',
          origin: true,
          
          credentials: true
        })
       );
    // ROUTES
    app.use("/api/auth", authRouter);
    app.use("/api/cuisines",cuisinesRouter);
    app.use("/api/orders" , orderRouter);
    // HEALTH CHECKER
    app.post('/api/healthchecker', async (req:Request, res: Response) => {
      const a =req.body

      const message = await redisClient.get('try');
      res.status(200).json({
        status: 'success',
        message,
      });
    });

    // UNHANDLED ROUTE
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
        //next(new AppError(404, `Route ${req.originalUrl} not found`));
      });
    // GLOBAL ERROR HANDLER
    app.use(
        (error: AppError, req: Request, res: Response, next: NextFunction) => {
          error.status = error.status || "error";
          error.statusCode = error.statusCode || 500;
  console.log(error);
          res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
          });
        }
      );
    const port = config.get<number>('port');
    app.listen(port);

    console.log(`Server started on port: ${port}`);
  })
  .catch((error) => console.log(error));

