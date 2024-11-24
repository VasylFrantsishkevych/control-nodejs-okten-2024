import { model, Schema } from "mongoose";

import { CarActiveEnum, CurrencyEnum, UkraineLocationEnum } from "../enums";
import { ICar } from "../interfaces";

const carSchema = new Schema({
   brand: {type: String, required: true},
   model: {type: String, required: true},
   photo: {type: String, default: ''},
   year: {type: Number, required: true},
   price: {type: Number, required: true},
   currency: {type: String, enum: CurrencyEnum, required: true},
   description: {type: String, required: true},
   location: { type: String, enum: UkraineLocationEnum, required: true },
   views: {type: Number, default: 0},
   // viewsByDay: [{ date: Date, count: Number }],
   isActive: {type: String, enum: CarActiveEnum, default: CarActiveEnum.EXPECTATION},
   seller: { type: Schema.Types.ObjectId, ref: 'users', required: false },
},
   {
      timestamps: true,
      versionKey: false,
   }
)

function restrictRoleUpdate(next: Function) {
   const update = this.getUpdate();
 
   if (update.$set?.isActive) {
     delete update.$set.isActive;
   }
   if (update.isActive) {
     delete update.isActive;
   }
 
   next();
 }

 carSchema.pre('findOneAndUpdate', restrictRoleUpdate);

export const Car = model<ICar>("cars", carSchema);