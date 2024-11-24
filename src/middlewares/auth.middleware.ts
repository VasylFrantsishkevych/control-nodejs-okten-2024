import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors";
import { tokenService } from "../services";
import { RoleEnum, TokenTypeEnum } from "../enums";
import { tokenRepository } from "../repositories";

class AuthMiddleware {
   public async checkAccessToken(req: Request, res: Response, next: NextFunction) {
      try {
        const header = req.headers.authorization;
        if (!header) {
         throw new ApiError('Token is not provided', 401);
        } 
        const accessToken = header.split('Bearer ')[1];
        const payload = tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS);

        const pair = await tokenRepository.findByParams({accessToken});
        if (!pair) {
         throw new ApiError('Token is not valid', 401);
        }
        
        req.res.locals.tokenId = pair._id;
        req.res.locals.jwtPayload = payload
        next();
      } catch (e) {
        next(e) 
      }
   } 

   public async checkRefreshToken(req: Request, res: Response, next: NextFunction) {
      try {
        const header = req.headers.authorization;
        if (!header) {
         throw new ApiError('Token is not provided', 401);
        } 
        const refreshToken = header.split('Bearer ')[1];
        const payload = tokenService.verifyToken(refreshToken, TokenTypeEnum.REFRESH);

        const pair = await tokenRepository.findByParams({refreshToken});
        if (!pair) {
         throw new ApiError('Token is not valid', 401);
        }
        req.res.locals.jwtPayload = payload;
        req.res.locals.refreshToken = refreshToken;
        next();
      } catch (e) {
        next(e) 
      }
   } 

   public checkIsBuyer(req: Request, res: Response, next: NextFunction) {
      try {
         const {role} = req.res.locals.jwtPayload;
         if (role !== RoleEnum.BUYER) {
            throw new ApiError('You must have buyer permissions', 404)
         }
         console.log(role)
         next()
      } catch (e) {
         next(e)
      }
   }
}

export const authMiddleware = new AuthMiddleware();