import { Router } from "express";
import { authController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post('/sign-up', commonMiddleware.checkIsBodyValid(UserValidator.create), authController.signUp);
router.post('/sign-in', commonMiddleware.checkIsBodyValid(UserValidator.signIn), authController.signIn);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh)

router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

export const authRouter = router;