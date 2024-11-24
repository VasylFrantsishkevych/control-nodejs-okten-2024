import mongoose from "mongoose";
import { CarActiveEnum, CurrencyEnum, UkraineLocationEnum } from "../enums";

export interface ICar {
   _id?: string,
   brand: string,
   model: string,
   photo: string,
   year: number,
   price: number,
   currency: CurrencyEnum,
   description: string,
   location: UkraineLocationEnum,
   views: number,
   // viewsByDay: { date: Date, count: number }[];
   isActive: CarActiveEnum,
   seller?: mongoose.Types.ObjectId
   createdAt?: Date;
   updatedAt?: Date;
}

export type ICarUpdate = Pick<
   ICar, 
   'brand' | 
   'model' | 
   'photo' | 
   'year' | 
   'price' | 
   'currency' | 
   'description' |
   'location'
>;