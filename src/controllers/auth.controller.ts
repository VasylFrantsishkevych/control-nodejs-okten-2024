import { Request, Response, NextFunction } from "express";

import { ISignIn, ITokenPayload, IUser } from "../interfaces";
import { authService } from "../services";

class AuthController {
   public async signUp(req: Request, res: Response, next: NextFunction) {
      try {
         const dto = req.body as IUser
         const result = await authService.signUp(dto);
         res.status(201).json(result)
      } catch (e) {
         next(e)
      }
   }

   public async signIn(req: Request, res: Response, next: NextFunction) {
      try {
         const dto = req.body as ISignIn
         const result = await authService.signIn(dto);
         res.status(201).json(result)
      } catch (e) {
         next(e)
      }
   }

   public async refresh(req: Request, res: Response, next: NextFunction) {
      try {
         const token = req.res.locals.refreshToken as string;
         const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;

         const result = await authService.refresh(token, jwtPayload);
         res.status(201).json(result)
      } catch (e) {
         next(e)
      }
   }

   public async logout(req: Request, res: Response, next: NextFunction) {
      try {
         const tokenId = req.res.locals.tokenId as string;

         await authService.logout(tokenId);
         res.sendStatus(204);
      } catch (e) {
         next(e);
      }
   }
}

export const authController = new AuthController();