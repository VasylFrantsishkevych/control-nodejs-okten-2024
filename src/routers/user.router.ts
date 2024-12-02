import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware, commonMiddleware, userMiddleware } from "../middlewares";
import { RoleEnum } from "../enums";
import { UserValidator } from "../validators";

const router = Router();

router.get('/', 
   commonMiddleware.isQueryValid(UserValidator.listQuery),
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.MANAGER]), 
   userController.getAll
);

router.get('/me',
   authMiddleware.checkAccessToken,
   userController.getMe
)
router.put('/me', 
      authMiddleware.checkAccessToken,
      commonMiddleware.checkIsBodyValid(UserValidator.update), 
      userController.updateMe
);
router.delete('/me', 
      authMiddleware.checkAccessToken,
      userController.deleteMe
);

export const userRouter = router;