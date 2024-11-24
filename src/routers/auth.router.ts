import { Router } from "express";
import { authController } from "../controllers";
import { commonMiddleware } from "../middlewares";
import { signIn, userValidator } from "../validators";

const router = Router();

router.post('/sign-up', commonMiddleware.userBodyValid(userValidator), authController.signUp);
router.post('/sign-in', commonMiddleware.userBodyValid(signIn), authController.signIn);

router.post('/refresh', authController.refresh)

router.post('/logout', authController.logout);

export const authRouter = router;