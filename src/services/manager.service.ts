import { CarActiveEnum, TypeAccountEnum } from "../enums";
import { ICarListQuery, ICarListResponse, IUser, IUserDocument, IUserListQuery, IUserListResponse } from "../interfaces";
import { userPresenter } from "../presenter";
import { carPresenter } from "../presenter/car.presenter";
import { carRepository, userRepository } from "../repositories";

class ManagerService {
   public async getAllNotValidCar(query: ICarListQuery): Promise<ICarListResponse> {
      const [notValidCars, total] = await carRepository.getAll(query, {isActive: CarActiveEnum.NOT_ACTIVE});
      return carPresenter.toListResDto(notValidCars, total, query);
   }
   public async givePremium(user: IUserDocument): Promise<IUser> {
      user.typeAccount = TypeAccountEnum.PREMIUM;
      return await user.save();
   }
   public async getBlockUsers(query: IUserListQuery): Promise<IUserListResponse> {
      const [blockUsers, total] = await userRepository.getAll(query, {block: true});
      return userPresenter.toListResDto(blockUsers, total, query)
   }
   public async blockUser(user: IUserDocument): Promise<IUser> {
      user.block = true
      return await user.save();
   }

   public async unblockUser(user: IUserDocument): Promise<IUser> {
      user.block = false
      return await user.save();
   }

   public async deleteBlockUser(userId: string): Promise<void> {
      await userRepository.delete(userId);
   }

   public async deleteNotValidCar(carId: string): Promise<void> {
      await carRepository.deleteById(carId);
   }
}

export const managerService = new ManagerService();