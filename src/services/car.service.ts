import { ApiError } from "../errors";
import { ICar, ICarUpdate } from "../interfaces";
import { carRepository } from "../repositories";

class CarService {
   public async getAll(): Promise<ICar[]> {
      return await carRepository.getAll();
   }

   public async getById(carId: string): Promise<ICar> {
      const car = await carRepository.findById(carId);
      if (!car) {
         throw new ApiError(`Car with ID: ${carId} no exist!`, 404);
      }

      return car;
   }

   public async create(dto: ICar): Promise<ICar> {
      return await carRepository.create(dto);
   }

   public async updateById(carId: string, dto: ICarUpdate): Promise<ICar> {
      return await carRepository.updateById(carId, dto);
   }

   public async deleteById(carId: string): Promise<void> {
      await carRepository.deleteById(carId);
   }

}

export const carService = new CarService();