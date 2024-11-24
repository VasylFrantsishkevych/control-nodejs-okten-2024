import { model, Schema } from "mongoose";

import { ICarBrandAndModel } from "../interfaces";

const carModelSchema = new Schema({
   name: {type: String, required: true},
},
   {
      timestamps: true,
      versionKey: false,
   }
)

export const Model = model<ICarBrandAndModel>("models", carModelSchema);