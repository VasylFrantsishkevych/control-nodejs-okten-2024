import { ICar, ICarUpdate, IDetailCarInfo } from "../interfaces";
import { carRepository } from "../repositories";

class CarService {
   public async getAll(): Promise<ICar[]> {
      return await carRepository.getAll();
   }

   public async getById(carId: string): Promise<ICar> {
      const car = await this.incViewsHistory(carId);
   
      return car;
   }

   public async getByIdDetailInfo(carId: string): Promise<IDetailCarInfo> {
      const car = await carRepository.findById(carId);
      
      const averagePrice = await carRepository.getAveragePrice(car.brand, car.location);
      const viewsDetails = await carRepository.getViewsDetails(carId);

      const detailCarInfo: IDetailCarInfo = {
         car,
         viewsDetails,
         averagePrice,
      }

      return detailCarInfo;
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

   private async incViewsHistory(carId: string): Promise<ICar> {

      const car = await carRepository.findById(carId);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      car.views +=1;

      const todayViewRecord = car.viewsHistory.find(record => {
         const recordDate = new Date(record.date);
         recordDate.setHours(0, 0, 0, 0);
         return recordDate.getTime() === today.getTime();
       });

       if (todayViewRecord) {
         // Якщо запис за сьогодні існує, збільшуємо кількість переглядів
         todayViewRecord.count += 1;
       } else {
         // Якщо запису немає, додаємо новий запис на сьогоднішній день
         car.viewsHistory.push({ date: today, count: 1 });
       }
   
       // Зберігаємо оновлену інформацію про автомобіль
       return await car.save();
   }
}

export const carService = new CarService();