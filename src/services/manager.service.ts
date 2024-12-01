import { CarActiveEnum, TypeAccountEnum } from "../enums";
import { ICar, IUser, IUserDocument, IUserListQuery, IUserListResponse } from "../interfaces";
import { userPresenter } from "../presenter";
import { carRepository, userRepository } from "../repositories";

class ManagerService {
   public async getAllNotValidCar(): Promise<ICar[]> {
      const notValidCars = await carRepository.getAll({isActive: CarActiveEnum.NOT_ACTIVE});
      return notValidCars;
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

   public async deleteNotValidCar(carId: string): Promise<void> {
      await carRepository.deleteById(carId);
   }
}

export const managerService = new ManagerService();