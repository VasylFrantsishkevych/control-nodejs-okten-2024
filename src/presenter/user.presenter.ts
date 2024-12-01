import { IUser, IUserListQuery, IUserListResponse, IUserResponse } from "../interfaces";


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

  public toListResDto(entities: IUser[], total: number, query: IUserListQuery): IUserListResponse {
   return {
     data: entities.map(this.toPublicResDto),
     total,
     ...query,
   };
 }
}

export const userPresenter = new UserPresenter();