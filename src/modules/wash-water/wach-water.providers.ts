import { Mongoose } from "mongoose";
import { washWaterSchema } from "./schema/wash-water.schema";

export const washWaterProviders = [
    {
        provide: 'WASH_WATER_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('washWater', washWaterSchema),
        inject: ['DATABASE_CONNECTION']
    }
]