import { Router } from "express";
import { authMiddleware, carMiddleware, commonMiddleware, userMiddleware } from "../middlewares";
import { RoleEnum } from "../enums";
import { managerController } from "../controllers";
import { UserValidator } from "../validators";

const router = Router();

router.get('/not-valid-cars',
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.MANAGER]),
   managerController.getAllNotValidCar
)

router.get('/block-users',
   commonMiddleware.isQueryValid(UserValidator.listQuery),
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.MANAGER]),
   managerController.getBlockUsers
)

router.put('/give-premium/:userId',
   commonMiddleware.checkIsIdvalid('userId'),
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.MANAGER]),
   userMiddleware.checkIsUserExist,
   managerController.givePremium
)

router.put('/block-user/:userId', 
   commonMiddleware.checkIsIdvalid('userId'),
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.MANAGER]), 
   userMiddleware.checkIsUserExist,
   managerController.blockUser
);

router.put('/unblock-user/:userId', 
   commonMiddleware.checkIsIdvalid('userId'),
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.MANAGER]), 
   userMiddleware.checkIsUserExist,
   managerController.unblockUser
);

router.delete('/delete-not-valid-car/:carId', 
   commonMiddleware.checkIsIdvalid('carId'),
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.MANAGER]), 
   carMiddleware.checkIsCarExist,
   managerController.deleteNotValidCar
);

export const managerRouter = router;