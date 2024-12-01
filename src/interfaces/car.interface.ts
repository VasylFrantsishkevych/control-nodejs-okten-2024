import { HydratedDocument} from "mongoose";
import { CarActiveEnum, CurrencyEnum, UkraineLocationEnum } from "../enums";

export interface ICar  {
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
   sellerId: string;
   createdAt?: Date;
   updatedAt?: Date;
}

export type ICarResponse = Pick<
   ICar,
   '_id' |
   'brand' | 
   'model' | 
   'photo' | 
   'year' | 
   'price' | 
   'currency' | 
   'location' |
   'isActive' 
>;
export type ICarDetails = Pick<
   ICar,
   '_id' |
   'brand' | 
   'model' | 
   'photo' | 
   'year' | 
   'price' | 
   'currency' | 
   'location' |
   'isActive' |
   'views' |
   'description' |
   'sellerId'
>;

export type ICarDocument = HydratedDocument<ICar>;

export interface IDetailCarInfoResponse {
   car: ICarDetails
   viewsDetails: ICarViewsDetails,
   averagePrice: ICarAveragePrice,
}

export type IViewsHistoryCar = Pick<ICar, 'viewsHistory'>;

export interface ICarUpdate  {
   _id?: string,
   brand?: string,
   model?: string,
   photo?: string,
   year?: number,
   price?: number,
   currency?: CurrencyEnum,
   description?: string,
   location?: UkraineLocationEnum,
}

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

export interface ICarListQuery {
   limit?: number,
   page?: number,
}

export interface ICarListResponse {
   data: ICarResponse[];
   total: number;
 }