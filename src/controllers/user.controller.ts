import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";
import { IUser } from "../interfaces";

class UserController {
   public async getAll(req: Request, res: Response, next: NextFunction) {
      try {
         const users = await userService.getAll();
         res.json(users);
      } catch (e) {
         next(e)
      }
   }

   public async getById(req: Request, res: Response, next: NextFunction) {
      try {
         const userId = req.params.userId;

         const user = await userService.getById(userId);
         res.json(user);
      } catch (e) {
         next(e)
      }
   }

   public async updateById(req: Request, res: Response, next: NextFunction) {
      try {
         const userId = req.params.userId;
         const dto = req.body as IUser;
         const userUpdate = await userService.updateById(userId, dto);
         res.status(201).json(userUpdate);
      } catch (e) {
         next(e);
      }
   }
}

export const userController = new UserController();