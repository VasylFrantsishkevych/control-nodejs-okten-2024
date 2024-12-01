import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { carRepository } from "../repositories";
import { ICar } from "../interfaces";
import { badWords } from "../constants/bad-words";
import { CarActiveEnum } from "../enums";

class CarMiddleware {
   public async checkIsCarExist(req: Request, res: Response, next: NextFunction) {
      try {
         const { carId } = req.params;
         const car = await carRepository.findById(carId);

         if (!car) {
            throw new ApiError(`Car with ID: ${carId} no exist!`, 404);
         }

         req.res.locals.car = car;
         next();
      } catch (e) {
         next(e);
      }
   }

   public checkBadWords (req: Request, res: Response, next: NextFunction) {
      try {
         let { description } = req.body as ICar;

         if (!description) {
            throw new ApiError('Description not exist', 400);
          }

          const words = description.toLowerCase().split(' ')
          const containsBadWords = badWords.some((word) => words.includes(word));

          if (!req.session.attempts) {
            req.session.attempts = 0;
          }

          if (containsBadWords) {
            req.session.attempts += 1;
            if (req.session.attempts >= 3) {
               req.body.isActive = CarActiveEnum.NOT_ACTIVE;
               req.session.attempts = 0

               
               return next()
             }
            throw new ApiError(`Description contains prohibited words. You hane ${3 - req.session.attempts} attemts` , 400);
          }

          req.session.attempts = 0
          req.body.isActive = CarActiveEnum.ACTIVE;

          next()
      } catch (e) {
         next(e)
      }
   }
}

export const carMiddleware = new CarMiddleware();