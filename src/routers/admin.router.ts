import { Router } from "express";

import { adminController } from "../controllers";
import { commonMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post('/sing-up-manager', 
   commonMiddleware.checkIsBodyValid(UserValidator.manager), 
   adminController.signUpManager
);

export const adminRouter = router;