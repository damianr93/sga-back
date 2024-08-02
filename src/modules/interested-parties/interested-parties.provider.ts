import { Mongoose } from "mongoose";
import { interestedPartiesSchema } from "./schema/interested-parties.schema";


export const interestedPartiesProvider = [
    {
        provide:'INTERESTED-PARTIES-MODEL',
        useFactory:(mongoose:Mongoose) => mongoose.model('interested-parties', interestedPartiesSchema),
        inject:['DATABASE_CONNECTION']
    }
]