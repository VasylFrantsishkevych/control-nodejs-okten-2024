import { ICar, ICarUpdate } from "../interfaces";
import { Car } from "../models";

class CarRepository {
   public async getAll(): Promise<ICar[]> {
      return await Car.find({});
   }

   public async findById(carId: string): Promise<ICar | null> {
      return await Car.findById(carId);
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
}

export const carRepository = new CarRepository();