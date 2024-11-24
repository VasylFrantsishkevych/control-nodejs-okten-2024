import { Router } from "express";
import { authController } from "../controllers";
import { commonMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post('/sign-up', commonMiddleware.checkIsBodyValid(UserValidator.create), authController.signUp);
router.post('/sign-in', commonMiddleware.checkIsBodyValid(UserValidator.signIn), authController.signIn);

router.post('/refresh', authController.refresh)

router.post('/logout', authController.logout);

export const authRouter = router;