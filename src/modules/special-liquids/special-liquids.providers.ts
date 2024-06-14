import { Mongoose } from "mongoose";
import { specialLiquidsSchema } from "./schema/special-liquids.schema";


export const specialLiquidsProviders = [
    {
        provide: "SPECIAL-LIQUIDS-MODEL",
        useFactory: (mongoose:Mongoose) => mongoose.model('specialLiquids', specialLiquidsSchema),
        inject: ["DATABASE_CONNECTION"]
    }
];