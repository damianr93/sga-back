import { Mongoose } from "mongoose";
import { metalWasteSchema } from "./schema/metal-waste.schema";


export const metalWasteProviders = [
    {
        provide: 'METAL-WASTE-MODEL',
        useFactory: (mongoose:Mongoose) => mongoose.model('metalWaste', metalWasteSchema),
        inject:['DATABASE_CONNECTION']
    }
]