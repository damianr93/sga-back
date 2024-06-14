import { Mongoose } from "mongoose";
import { wasteSchema } from "./schema/waste.schema";



export const wasteProviders = [
    {
        provide:"WASTE-MODEL",
        useFactory: (mongoose: Mongoose) => mongoose.model('waste', wasteSchema),
        inject:['DATABASE_CONNECTION']
    }
]