import { RoleEnum, TypeAccountEnum } from "../enums";

export interface IToken {
   _id?: string;
   accessToken: string;
   refreshToken: string;
   _userId: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface ITokenPayload {
   userId: string;
   role: RoleEnum;
   typeAccount: TypeAccountEnum;
}

export interface ITokenPair {
   accessToken: string;
   refreshToken: string;
}