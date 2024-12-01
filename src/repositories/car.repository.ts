import mongoose from "mongoose";
import dayjs from "dayjs";

import { ICar, ICarAveragePrice, ICarUpdate, ICarViewsDetails } from "../interfaces";
import { Car } from "../models";
import { timeHelper } from "../helpers";

class CarRepository {
   public async getAll(filter = {}): Promise<ICar[]> {
      return await Car.find(filter).select('-viewsHistory');
   }

   public async findById(carId: string): Promise<ICar | null> {
      return await Car.findById(carId);
   }

   public async  getOneById(carId: string): Promise<ICar> {
      return await Car.findOne({_id: carId}).select('-viewsHistory');
  }

   public async create(dto: ICar): Promise<ICar> {
      return await Car.create(dto);
   }  
   
   public async updateById(carId: string, dto: ICarUpdate): Promise<ICar> {
      return await Car.findOneAndUpdate({_id: carId}, dto, {
         new: true,
      });
   }

   public async deleteById(carId: string): Promise<void> {
      await Car.deleteOne({_id: carId});
   }

   public async incVeiws(carId: string): Promise<ICar> {
      return await Car.findByIdAndUpdate(
         carId, 
         { $inc: { views: 1} },
         { new: true}
      )
   } 

   public async getViewsDetails(carId: string): Promise<ICarViewsDetails> {

      const today = dayjs();
      const startOfToday = today.startOf('day').toDate();
   
      const oneDayAgo = timeHelper.subtractByParams(1, 'day');
      const oneWeekAgo = timeHelper.subtractByParams(1, 'week');
      const oneMonthAgo = timeHelper.subtractByParams(1, 'month');

      const viewsData = await Car.aggregate([
         { $match: { _id: new mongoose.Types.ObjectId(carId) } }, // Знаходимо авто за ID
         { $unwind: '$viewsHistory' }, // Розгортаємо масив viewsHistory
         {
           $facet: {
             lastDay: [
               { $match: { 'viewsHistory.date': { $gte: oneDayAgo } } }, // Перегляди за останній день
               { $group: { _id: null, total: { $sum: '$viewsHistory.count' } } },
             ],
             lastWeek: [
               { $match: { 'viewsHistory.date': { $gte: oneWeekAgo, $lt: startOfToday } } }, // Перегляди за останній тиждень
               { $group: { _id: null, total: { $sum: '$viewsHistory.count' } } },
             ],
             lastMonth: [
               { $match: { 'viewsHistory.date': { $gte: oneMonthAgo, $lt: startOfToday } } }, // Перегляди за останній місяць
               { $group: { _id: null, total: { $sum: '$viewsHistory.count' } } },
             ],
           },
         },
      ])
      console.log(viewsData)
      const lastDayViews = viewsData[0].lastDay[0]?.total || 0;
      const lastWeekViews = viewsData[0].lastWeek[0]?.total || 0;
      const lastMonthViews = viewsData[0].lastMonth[0]?.total || 0;

      return {lastDayViews, lastWeekViews, lastMonthViews};
   }

   public async getAveragePrice(brand: string, location: string): Promise<ICarAveragePrice> {
      const averagePriceData = await Car.aggregate([
         {
            $facet: {
               averagePriceUkraine: [
                  { $match: { brand } },
                  { $group: { _id: '$brand', averagePrice: { $avg: '$price' } } },
               ],
               averagePriceRegion: [
                  { $match: { brand, location } },
                  { $group: { _id: '$location',  averagePrice: { $avg: '$price' } } },
               ]
            }
         }
      ])

      return {
         averagePriceUkraine: averagePriceData[0].averagePriceUkraine[0].averagePrice,
         averagePriceRegion: averagePriceData[0].averagePriceRegion[0].averagePrice
      };
   }
}

export const carRepository = new CarRepository();