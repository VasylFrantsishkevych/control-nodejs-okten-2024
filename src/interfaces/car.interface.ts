import mongoose, {Document} from "mongoose";
import { CarActiveEnum, CurrencyEnum, UkraineLocationEnum } from "../enums";

export type ICar = {
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
   viewsHistory: [{ date: Date, count: number }];
   isActive: CarActiveEnum,
   seller: mongoose.Schema.Types.ObjectId;
   createdAt?: Date;
   updatedAt?: Date;
} & Document

export type IViewsHistoryCar = Pick<ICar, 'viewsHistory'>;

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

export interface ICarAveragePrice {
   averagePriceUkraine: number,
   averagePriceRegion: number,
}

export interface ICarViewsDetails {
   lastDayViews: string;
   lastWeekViews: string;
   lastMonthViews: string;
}

export interface IDetailCarInfo {
   car: ICar,
   viewsDetails: ICarViewsDetails,
   averagePrice: ICarAveragePrice,
}