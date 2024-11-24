import { Router } from "express";

import { adminController } from "../controllers";
import { commonMiddleware } from "../middlewares";
import { managerValidator } from "../validators";

const router = Router();

router.post('/sing-up-manager', commonMiddleware.userBodyValid(managerValidator), adminController.signUpManager);

export const adminRouter = router;