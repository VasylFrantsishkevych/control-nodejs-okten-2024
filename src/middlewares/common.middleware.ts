import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { ObjectSchema } from "joi";

import { ApiError } from "../errors";

class CommonMiddleware {
   public checkIsIdvalid(key: string) {
      return (req: Request, res: Response, next: NextFunction) => {
         try {
            if (!isObjectIdOrHexString(req.params[key])) {
               throw new ApiError('Invalid ID', 400);
            }
            next();
         } catch (e) {
            next(e);
         }
      }
   }

   public checkIsBodyValid(validator: ObjectSchema) {
      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          req.body = await validator.validateAsync(req.body);
          next();
        } catch (e) {
          next(new ApiError(e.details[0].message, 400));
        }
      };
    }

   public isQueryValid(validator: ObjectSchema) {
      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          req.query = await validator.validateAsync(req.query);
          next();
        } catch (e) {
          next(new ApiError(e.details[0].message, 400));
        }
      };
   }
}

export const commonMiddleware = new CommonMiddleware();