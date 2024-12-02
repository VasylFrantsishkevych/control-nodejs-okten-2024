import { ApiError } from "../errors";
import {  ITokenPayload, IUser, IUserListQuery, IUserListResponse, IUserMeResponse } from "../interfaces";
import { userPresenter } from "../presenter";
import { userRepository } from "../repositories/user.repository";

class UserService {
   public async getAll(query: IUserListQuery): Promise<IUserListResponse> {
      const [users, total] = await userRepository.getAll(query);
      return userPresenter.toListResDto(users, total, query)
   }

   public async getMe(jwtPayload: ITokenPayload): Promise<IUserMeResponse> {
      const {userId} = jwtPayload;
      const user = await userRepository.getMe(userId);

      if (!user) {
         throw new ApiError(`User with ID: ${userId} no exist!`, 404);
      }

      return userPresenter.toMeResDto(user);
   }

   public async updateMe(userId: string, dto: IUser): Promise<IUser> {
      const updateUser = await userRepository.updateMe(userId, dto);
      console.log(updateUser)
      return updateUser
   }

   public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
      await userRepository.delete(jwtPayload.userId);
   }
}

export const userService = new UserService();