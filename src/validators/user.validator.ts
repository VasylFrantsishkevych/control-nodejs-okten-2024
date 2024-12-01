import joi from "joi";
import { regex } from "../constants";
import { TypeAccountEnum } from "../enums";

export class UserValidator {
  private static userName = joi.string().min(3).max(20).trim();
  private static email = joi.string().lowercase().trim().regex(regex.EMAIL);
  private static password = joi.string().trim().regex(regex.PASSWORD);
  private static phone = joi.string().trim().regex(regex.PHONE);
  private static typeAccount = joi.string().valid(...Object.values(TypeAccountEnum));

  public static create = joi.object({
   userName: this.userName.required(),
   email: this.email.required(),
   password: this.password.required(),
   phone: this.phone.required(),
   role: joi.any().valid('seller', 'buyer').required(),
   typeAccount: this.typeAccount.default(TypeAccountEnum.BASIC),
  });

  public static manager = joi.object({
   userName: this.userName.required(),
   email: this.email.required(),
   password: this.password.required(),
   phone: this.phone.required(),
   role: joi.any().valid('manager').required(),
   typeAccount: this.typeAccount.default(TypeAccountEnum.PREMIUM),
  });

  public static update = joi.object({
   userName: this.userName,
   phone: this.phone,
  });

  public static signIn = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static changePassword = joi.object({
    oldPassword: this.password.required(),
    password: this.password.required(),
  });
  public static listQuery = joi.object({
    limit: joi.number().min(1).max(100).default(10),
    page: joi.number().min(1).default(1),
  });
}
