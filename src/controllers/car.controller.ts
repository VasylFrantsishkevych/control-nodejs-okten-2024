import { NextFunction, Request, Response } from "express";

import { ICar, ICarUpdate } from "../interfaces";
import { carService } from "../services";

class CarController {
   public async create(req: Request, res: Response, next: NextFunction) {
      try {
        const dto = req.body as ICar; 
        const result = await carService.create(dto);
        res.status(201).json(result);
      } catch (e) {
         next(e);
      }
   }

   public async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const cars = await carService.getAll();
         res.json(cars);
      } catch (e) {
         next(e)
      }
   }

   public async getById(req: Request, res: Response, next: NextFunction) {
      try {
         const car = req.res.locals.car;

         // const user = await carService.getById(carId);
         res.json(car);
      } catch (e) {
         next(e)
      }
   }

   public async updateById(req: Request, res: Response, next: NextFunction) {
      try {
         const carId = req.params.carId;
         const dto = req.body as ICarUpdate;
         const carUpdate = await carService.updateById(carId, dto);
         res.status(201).json(carUpdate);
      } catch (e) {
         next(e);
      }
   }

   public async deleteById(req: Request, res: Response, next: NextFunction) {
      try {
         const carId = req.params.carId;
         await carService.deleteById(carId);
         res.status(204);
      } catch (e) {
         next(e);
      }
   }
}

export const carController = new CarController();