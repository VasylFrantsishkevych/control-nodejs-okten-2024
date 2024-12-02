import { IUser, IUserListQuery, IUserListResponse, IUserMeResponse, IUserResponse } from "../interfaces";


class UserPresenter {
  public toPublicResDto(entity: IUser): IUserResponse {
    return {
      _id: entity._id,
      userName: entity.userName,
      email: entity.email,
      phone: entity.phone,
      role: entity.role,
      typeAccount: entity.typeAccount,
      block: entity.block,
    };
  }

  public toMeResDto(entity: IUser): IUserMeResponse {
    return {
      _id: entity._id,
      userName: entity.userName,
      email: entity.email,
      phone: entity.phone,
      role: entity.role,
      typeAccount: entity.typeAccount,
      block: entity.block,
      cars: entity.cars,
    }
  }

  public toListResDto(entities: IUser[], total: number, query: IUserListQuery): IUserListResponse {
   return {
     data: entities.map(this.toPublicResDto),
     total,
     ...query,
   };
 }
}

export const userPresenter = new UserPresenter();