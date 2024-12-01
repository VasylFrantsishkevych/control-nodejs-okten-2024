import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ICar, ICarUpdate, ITokenPayload, IUserListQuery } from "../interfaces";
import { carService } from "../services";

class CarController {
   public async create(req: Request, res: Response, next: NextFunction) {
      try {
        const dto = req.body as ICar; 
        const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
        const result = await carService.create(dto, jwtPayload);
        res.status(201).json(result);
      } catch (e) {
         next(e);
      }
   }

   public async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const query = req.query as IUserListQuery;
         const cars = await carService.getAll(query);
         res.json(cars);
      } catch (e) {
         next(e)
      }
   }

   public async getById(req: Request, res: Response, next: NextFunction) {
      try {
         const carId = req.params.carId;
         const car = await carService.getById(carId);
         res.json(car);
      } catch (e) {
         next(e)
      }
   }

   public async getByIdDetailInfo(req: Request, res: Response, next: NextFunction) {
      try {
         const carId = req.params.carId;
         const car = await carService.getByIdDetailInfo(carId);
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
   public async uploadPhoto(req: Request, res: Response, next: NextFunction) {
      try {
         const carId = req.params.carId
         const carPhoto = req.files.image as UploadedFile;
         const carWithPhoto = await carService.uploadPhoto(carId, carPhoto);

         res.status(201).json(carWithPhoto)
      } catch (e) {
         next(e);
      }
   }
   public async deletePhoto(req: Request, res: Response, next: NextFunction) {
      try {
         const carId = req.params.carId
  
        const car = await carService.deletePhoto(carId);
        
        res.status(201).json(car);
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