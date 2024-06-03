import { Mongoose, mongo } from "mongoose";
import { compressedCardboardSchema } from "./schema/compressed-cardboard.schema";


export const compressedCardboardProviders = [
    {
        provide:"COMPRESSED-CARDBOARD-MODEL",
        useFactory: (mongoose:Mongoose) => mongoose.model('compressedCardboard', compressedCardboardSchema),
        inject:['DATABASE_CONNECTION']
    }
];