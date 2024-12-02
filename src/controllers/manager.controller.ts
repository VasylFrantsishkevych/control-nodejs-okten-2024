import { NextFunction, Request, Response } from "express";

import { managerService } from "../services";
import { IUserListQuery } from "../interfaces";

class ManagerController {
   public async getAllNotValidCar(req: Request, res: Response, next: NextFunction) {
      try {
         const query = req.query as IUserListQuery;
         const user = await managerService.getAllNotValidCar(query);
         res.json(user);
      } catch (e) {
         next(e)
      }
   }

   public async getBlockUsers(req: Request, res: Response, next: NextFunction) {
      try {
         const query = req.query as IUserListQuery;
         const user = await managerService.getBlockUsers(query);
         res.json(user);
      } catch (e) {
         next(e)
      }
   }
   public async givePremium(req: Request, res: Response, next: NextFunction) {
      try {
         const user = await managerService.givePremium(req.res.locals.user);
         res.json(user);
      } catch (e) {
         next(e)
      }
   }

   public async blockUser(req: Request, res: Response, next: NextFunction) {
      try {
         const user = await managerService.blockUser(req.res.locals.user);
         res.json(user);
      } catch (e) {
         next(e)
      }
   }

   public async unblockUser(req: Request, res: Response, next: NextFunction) {
      try {
         const user = await managerService.unblockUser(req.res.locals.user);
         res.json(user);
      } catch (e) {
         next(e)
      }
   }

   public async deleteBlockUser(req: Request, res: Response, next: NextFunction) {
      try {
         const {userId} = req.params;
         await managerService.deleteBlockUser(userId);
         res.sendStatus(204);
      } catch (e) {
         next(e)
      }
   }

   public async deleteNotValidCar(req: Request, res: Response, next: NextFunction) {
      try {
         const {carId} = req.params;
         await managerService.deleteNotValidCar(carId);
         res.sendStatus(204);
      } catch (e) {
         next(e)
      }
   }
}

export const managerController = new ManagerController();