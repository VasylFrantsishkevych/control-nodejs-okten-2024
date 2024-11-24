import { Router } from "express";

import { carController } from "../controllers";
import { authMiddleware, carMiddleware, commonMiddleware } from "../middlewares";
import { CarValidator } from "../validators";

const router = Router();

router.get('/', 
   authMiddleware.checkAccessToken,
   authMiddleware.checkIsBuyer,
   carController.getAll
);
router.post('/', 
   commonMiddleware.checkIsBodyValid(CarValidator.create), 
   carController.create
);
router.get('/:carId',
   commonMiddleware.checkIsIdvalid('carId'),
   carMiddleware.checkIsCarExist,
   carController.getById,
);
router.put('/:carId',
   commonMiddleware.checkIsIdvalid('carId'),
   commonMiddleware.checkIsBodyValid(CarValidator.update), 
   carMiddleware.checkIsCarExist,
   carController.updateById,
);
router.delete('/:carId', 
   commonMiddleware.checkIsIdvalid('carId'),
   carMiddleware.checkIsCarExist,
   carController.deleteById,
);

export const carRouter = router;