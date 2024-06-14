import { Mongoose } from "mongoose";
import { specialWasteSchema } from "./schema/special-waste.schema";


export const specialWasteProviders = [
    {
        provide:"SPECIAL-WASTE-MODEL",
        useFactory: (mongoose: Mongoose) => mongoose.model('specialWaste', specialWasteSchema),
        inject:['DATABASE_CONNECTION']
    }
]