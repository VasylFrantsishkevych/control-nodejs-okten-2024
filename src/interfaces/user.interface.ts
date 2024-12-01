import {HydratedDocument} from "mongoose";

import { RoleEnum, TypeAccountEnum } from "../enums";
import { ICar } from "./car.interface";

export interface IUser {
   _id?: string,
   userName: string,
   email: string,
   password: string,
   phone: string,
   role: RoleEnum,
   typeAccount: TypeAccountEnum,
   block?: boolean,
   cars?: string | ICar[],
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

export type IUserDocument = HydratedDocument<IUser>;

export type ISignIn = Pick<IUser, 'email' | 'password'>;
