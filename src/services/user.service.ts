import { ApiError } from "../errors";
import {  IUser } from "../interfaces";
import { userRepository } from "../repositories/user.repository";

class UserService {
   public async getAll(): Promise<IUser[]> {
      return await userRepository.getAll();
   }

   public async getById(userId: string): Promise<IUser> {
      const user = await userRepository.getById(userId);
      if (!user) {
         throw new ApiError(`User with ID: ${userId} no exist!`, 404);
      }

      return user;
   }

   public async updateById(userId: string, dto: IUser): Promise<IUser> {
      return await userRepository.updateById(userId, dto);
   }
}

export const userService = new UserService();