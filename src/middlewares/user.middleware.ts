import { Request, Response, NextFunction } from "express";
import { RoleEnum, TypeAccountEnum } from "../enums";
import { ApiError } from "../errors";
import { ITokenPayload } from "../interfaces";
import { userRepository } from "../repositories";

class UserMiddleware {
   public async checkIsUserExist(req: Request, res: Response, next: NextFunction) {
      try {
         const { userId } = req.params;
         const user = await userRepository.getById(userId);

         if (!user) {
            throw new ApiError(`User with ID: ${userId} no exist!`, 404);
         }

         req.res.locals.user = user;
         next();
      } catch (e) {
         next(e);
      }
   }
   public checkIsAllowRoles(allowedRoles: RoleEnum[]) {
      return (req: Request, res: Response, next: NextFunction) => {
         try {
            const {role} = req.res.locals.jwtPayload as ITokenPayload;

            if (role === 'admin') {
               return next();
            }

            if (!allowedRoles.includes(role)) {
               throw new ApiError('You do not have role to access', 403)
            }

            next()
         } catch (e) {
            next(e)
         }
      }
   }

   public checkIsTypeAccount(req: Request, res: Response, next: NextFunction) {
      try {
         const {typeAccount} = req.res.locals.jwtPayload as ITokenPayload;

         if (typeAccount !== TypeAccountEnum.PREMIUM) {
            throw new ApiError('You need a premium account to access.', 403)
         }

         next()
      } catch (e) {
         next(e)
      }
   }
}


export const userMiddleware = new UserMiddleware();