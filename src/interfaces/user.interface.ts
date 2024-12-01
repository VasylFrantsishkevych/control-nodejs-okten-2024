import mongoose, {Document} from "mongoose";
import { RoleEnum, TypeAccountEnum } from "../enums";

export interface IUser {
   _id?: string,
   userName: string,
   email: string,
   password: string,
   phone: string,
   role: RoleEnum,
   typeAccount: TypeAccountEnum;
   block?: boolean,
   cars?: [mongoose.Schema.Types.ObjectId],
   createdAt?: Date,
   updatedAt?: Date,
}

export interface IUserListQuery {
   limit?: number,
   page?: number,
}

export interface IUserListResponse {
   data: IUserResponse[];
   total: number;
 }

export type IUserResponse = Pick<
  IUser,
  | "_id"
  | "userName"
  | "email"
  | "phone"
  | "role"
  | "typeAccount"
  | "block"
>;

export type IUserDocument = IUser & Document;

export type ISignIn = Pick<IUser, 'email' | 'password'>;
