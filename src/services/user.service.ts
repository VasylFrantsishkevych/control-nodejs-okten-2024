import { ApiError } from "../errors";
import {  ITokenPayload, IUser, IUserListQuery, IUserListResponse } from "../interfaces";
import { userPresenter } from "../presenter";
import { userRepository } from "../repositories/user.repository";

class UserService {
   public async getAll(query: IUserListQuery): Promise<IUserListResponse> {
      const [users, total] = await userRepository.getAll(query);
      return userPresenter.toListResDto(users, total, query)
   }

   public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
      const {userId} = jwtPayload;
      const user = await userRepository.getMe(userId);

      if (!user) {
         throw new ApiError(`User with ID: ${userId} no exist!`, 404);
      }

      // return userPresenter.toPublicResDto(user);
      return user;
   }

   public async updateById(userId: string, dto: IUser): Promise<IUser> {
      return await userRepository.updateById(userId, dto);
   }
}

export const userService = new UserService();