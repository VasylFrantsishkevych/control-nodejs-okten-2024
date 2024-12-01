import { Router } from "express";

import { adminController } from "../controllers";
import { authMiddleware, commonMiddleware, userMiddleware } from "../middlewares";
import { UserValidator } from "../validators";
import { RoleEnum } from "../enums";

const router = Router();

router.post('/sing-up-manager',
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.ADMIN]),
   commonMiddleware.checkIsBodyValid(UserValidator.manager), 
   adminController.signUpManager
);

export const adminRouter = router;