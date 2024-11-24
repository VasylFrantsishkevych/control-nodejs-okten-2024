import { model, Schema } from "mongoose";

import { RoleEnum, TypeAccountEnum } from "../enums";
import { IUser } from "../interfaces";

const userSchema = new Schema({
   userName: {type: String, required: true},
   email: {type: String, required: true, unique: true},
   password: {type: String, required: true, select: false},
   phone: {type: String, required: true},
   role: {type: String, enum: RoleEnum},
   typeAccount: {type: String, enum: TypeAccountEnum, default: TypeAccountEnum.BASIC},
   block: {type: Boolean, default: false},
   isDeleted: {type: Boolean, default: false},
   cars: {type: Schema.Types.ObjectId, ref: 'cars'}
},
   {
      timestamps: true,
      versionKey: false,
   }
)

export const User = model<IUser>("users", userSchema);