import mongoose from "mongoose";
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
   cars?: mongoose.Types.ObjectId,
   isDeleted?: boolean,
   createdAt?: Date;
   updatedAt?: Date;
}

export type ISignIn = Pick<IUser, 'email' | 'password'>;
