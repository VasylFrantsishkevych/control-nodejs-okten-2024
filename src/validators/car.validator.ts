import joi from "joi";
import { CarActiveEnum, CurrencyEnum, UkraineLocationEnum } from "../enums";

export class CarValidator {
  private static brandAndModel = joi.string().min(2).max(30).trim().alphanum();
  private static photo = joi.string();
  private static year = joi.number().integer().min(1950).max(new Date().getFullYear());
  private static price = joi.number();
  private static currency = joi.string().valid(...Object.values(CurrencyEnum));
  private static description = joi.string();
  private static location = joi.string().valid(...Object.values(UkraineLocationEnum));
  

  public static create = joi.object({
   brand: this.brandAndModel.required(),
   model: this.brandAndModel.required(),
   photo: this.photo.default(''),
   year: this.year.required(),
   price: this.price.required(),
   currency: this.currency.required(),
   description: this.description.required(),
   location: this.location.required(),
  });

  public static update = joi.object({
   brand: this.brandAndModel,
   model: this.brandAndModel,
   photo: this.photo,
   year: this.year,
   price: this.price,
   currency: this.currency,
   description: this.description,
   location: this.location,
   isActive: joi.string().valid(...Object.values(CarActiveEnum)),
  });
}