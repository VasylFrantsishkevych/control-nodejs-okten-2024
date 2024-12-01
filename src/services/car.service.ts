import { UploadedFile } from "express-fileupload";
import { ICar, ICarDetails, ICarListQuery, ICarListResponse, ICarUpdate, IDetailCarInfo, IDetailCarInfoResponse, ITokenPayload } from "../interfaces";
import { carPresenter } from "../presenter/car.presenter";
import { carRepository, userRepository } from "../repositories";
import { s3Service } from "./s3.servise";
import { FileItemTypeEnum } from "../enums";

class CarService {
   public async create(dto: ICar, jwtPayload: ITokenPayload): Promise<ICar> {
      const {userId} = jwtPayload;
      const car = await carRepository.create({...dto, sellerId: userId});
      
      await userRepository.updateCarsForUser(userId, car)
      
      return car;
   }
   public async getAll(query: ICarListQuery): Promise<ICarListResponse> {
      const [cars, total] = await carRepository.getAll(query);
      return carPresenter.toListResDto(cars, total, query);
   }

   public async getById(carId: string): Promise<ICarDetails> {
      const car = await this.incViewsHistory(carId);
   
      return carPresenter.toCarDetailsResDto(car);
   }

   public async getByIdDetailInfo(carId: string): Promise<IDetailCarInfoResponse> {
      const car = await carRepository.findById(carId);
      
      const averagePrice = await carRepository.getAveragePrice(car.brand, car.location);
      const viewsDetails = await carRepository.getViewsDetails(carId);

      const detailCarInfo: IDetailCarInfo = {
         car,
         viewsDetails,
         averagePrice,
      }

      return carPresenter.toCarInfoResDto(detailCarInfo);
   }

   public async updateById(carId: string, dto: ICarUpdate): Promise<ICar> {
      return await carRepository.updateById(carId, dto);
   }

   public async uploadPhoto(carId:string, carPhoto: UploadedFile): Promise<ICar> {
      const car = await carRepository.getOneById(carId);

      const photo = await s3Service.uploadFile(carPhoto, FileItemTypeEnum.CAR, carId);
      const updatedCar = await carRepository.updateById(carId, {photo})

      if (car.photo) {
         await s3Service.deleteFile(car.photo)
      }
      return updatedCar;
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