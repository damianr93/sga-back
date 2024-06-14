import { Mongoose } from "mongoose";
import { energySchema } from "./schema/energy.schema";


export const energyProviders = [{
    provide:'ENERGY-MODEL',
    useFactory: (mongoose:Mongoose) => mongoose.model('energy', energySchema),
    inject:['DATABASE_CONNECTION']
}]