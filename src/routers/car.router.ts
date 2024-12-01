import { Router } from "express";

import { carController } from "../controllers";
import { authMiddleware, carMiddleware, commonMiddleware, userMiddleware } from "../middlewares";
import { CarValidator, UserValidator } from "../validators";
import { RoleEnum } from "../enums";

const router = Router();

router.get('/', 
   commonMiddleware.isQueryValid(UserValidator.listQuery),
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.BUYER]),
   carController.getAll
);
router.post('/', 
   commonMiddleware.checkIsBodyValid(CarValidator.create), 
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.SELLER]),
   carMiddleware.checkBadWords,
   carController.create
);
router.get('/:carId',
   commonMiddleware.checkIsIdvalid('carId'),
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.BUYER, RoleEnum.MANAGER]),
   carMiddleware.checkIsCarExist,
   carController.getById,
);

router.put('/:carId',
   commonMiddleware.checkIsIdvalid('carId'),
   commonMiddleware.checkIsBodyValid(CarValidator.update), 
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.SELLER]),
   carMiddleware.checkIsCarExist,
   carController.updateById,
);
router.delete('/:carId', 
   commonMiddleware.checkIsIdvalid('carId'),
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.SELLER, RoleEnum.MANAGER]),
   carMiddleware.checkIsCarExist,
   carController.deleteById,
);
router.get('/detail-info/:carId',
   commonMiddleware.checkIsIdvalid('carId'),
   authMiddleware.checkAccessToken,
   userMiddleware.checkIsAllowRoles([RoleEnum.BUYER, RoleEnum.MANAGER]),
   userMiddleware.checkIsTypeAccount,
   carMiddleware.checkIsCarExist,
   carController.getByIdDetailInfo,
);

export const carRouter = router;