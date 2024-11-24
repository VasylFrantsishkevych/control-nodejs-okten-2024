import { model, Schema } from "mongoose";

import { ICarBrandAndModel } from "../interfaces";

const carBrandSchema = new Schema({
   name: {type: String, required: true},
},
   {
      timestamps: true,
      versionKey: false,
   }
)

export const Brand = model<ICarBrandAndModel>("brands", carBrandSchema);