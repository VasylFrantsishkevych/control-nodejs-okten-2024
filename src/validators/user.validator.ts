// import joi from "joi";
// import { regex } from "../constants";
// import { TypeAccountEnum } from "../enums";

// export class UserValidator {
//   private static userName = joi.string().min(3).max(20).trim();
//   private static email = joi.string().lowercase().trim().regex(regex.EMAIL);
//   private static password = joi.string().trim().regex(regex.PASSWORD);
//   private static phone = joi.string().trim().regex(regex.PHONE);

//   public static create = joi.object({
//    userName: this.userName.required(),
//    email: this.email.required(),
//    password: this.password.required(),
//    phone: this.phone.required(),
//    role: joi.any().valid(['seller', 'buyer']).required(),
//    typeAccount: joi.string().valid(TypeAccountEnum).default(TypeAccountEnum.BASIC),
//   });

//   public static update = joi.object({
//    userName: this.userName,
//    phone: this.phone,
//   });

//   public static signIn = joi.object({
//     email: this.email.required(),
//     password: this.password.required(),
//   });

//   public static changePassword = joi.object({
//     oldPassword: this.password.required(),
//     password: this.password.required(),
//   });
// }

import Joi from "joi";
import { regex } from "../constants/regex";
import { TypeAccountEnum } from "../enums";

export const userValidator = Joi.object({
   userName: Joi.string().alphanum().min(3).max(30).trim().required(),
   email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
   password: Joi.string().regex(regex.PASSWORD).required(),
   phone: Joi.string().trim().regex(regex.PHONE).required(),
   role: Joi.any().valid('seller', 'buyer').required(),
   typeAccount: Joi.string().valid(TypeAccountEnum).default(TypeAccountEnum.BASIC),
})

export const managerValidator = Joi.object({
   userName: Joi.string().alphanum().min(3).max(30).trim().required(),
   email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
   password: Joi.string().regex(regex.PASSWORD).required(),
   phone: Joi.string().trim().regex(regex.PHONE).required(),
   role: Joi.any().valid('manager').default('manager'),
   typeAccount: Joi.string().valid(TypeAccountEnum).default(TypeAccountEnum.PREMIUM),
})

export const userUpdateValidator = Joi.object({
   name: Joi.string().alphanum().min(3).max(30).trim(),
   email: Joi.string().regex(regex.EMAIL).lowercase().trim(),
   age: Joi.number().integer().min(1).max(100),
   phone: Joi.string().regex(regex.PHONE).trim(),
})

export const signIn = Joi.object({
   email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
   password: Joi.string().regex(regex.PASSWORD).required(),
})

export const changePassword = Joi.object({
   oldPassword: Joi.string().regex(regex.PASSWORD).required(),
   password: Joi.string().regex(regex.PASSWORD).required(),
 });