import { Mongoose } from "mongoose";
import { criteriosSchema } from "./schema/criterios.schema";


export const criteriosProviders = [{
    provide:'CRITERIOS-MODEL',
    useFactory: (mongoose:Mongoose) => mongoose.model('criterios', criteriosSchema),
    inject:['DATABASE_CONNECTION']
}]