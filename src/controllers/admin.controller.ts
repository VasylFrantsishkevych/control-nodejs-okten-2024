import { Request, Response, NextFunction } from "express";

import { IUser } from "../interfaces";
import { adminService } from "../services/admin.service";

class AdminController {
   public async signUpManager(req: Request, res: Response, next: NextFunction) {
      try {
         const managerDto = req.body as IUser
         const result = await adminService.signUpManager(managerDto);
         res.status(201).json(result)
      } catch (e) {
         next(e)
      }
   }
}

export const adminController = new AdminController();