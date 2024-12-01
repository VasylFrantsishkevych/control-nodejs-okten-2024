import { ICar, ICarDetails, ICarListQuery, ICarListResponse, ICarResponse, IDetailCarInfo, IDetailCarInfoResponse } from "../interfaces";

class CarPresenter {
   public toPublicResDto(entity: ICar): ICarResponse {
     return {
      brand: entity.brand,
      model: entity.model,
      photo: entity.photo,
      year: entity.year,
      price: entity.price,
      currency: entity.currency,
      location: entity.location,
      isActive: entity.isActive,
     };
   }

   public toCarDetailsResDto (entity: ICar): ICarDetails {
      return {
        brand: entity.brand,
        model: entity.model,
        photo: entity.photo,
        year: entity.year,
        price: entity.price,
        currency: entity.currency,
        location: entity.location,
        isActive: entity.isActive,
        views: entity.views,
        description: entity.description,
        sellerId: entity.sellerId,
      }
   }

   public toCarInfoResDto (entity: IDetailCarInfo): IDetailCarInfoResponse{
    return {
      car: {
        brand: entity.car.brand,
        model: entity.car.model,
        photo: entity.car.photo,
        year: entity.car.year,
        price: entity.car.price,
        currency: entity.car.currency,
        location: entity.car.location,
        isActive: entity.car.isActive,
        views: entity.car.views,
        description: entity.car.description,
        sellerId: entity.car.sellerId
      },
      viewsDetails: entity.viewsDetails,
      averagePrice: entity.averagePrice,
    }
   }
 
   public toListResDto(entities: ICar[], total: number, query: ICarListQuery): ICarListResponse {
    return {
      data: entities.map(this.toPublicResDto),
      total,
      ...query,
    };
  }
 }
 
 export const carPresenter = new CarPresenter();