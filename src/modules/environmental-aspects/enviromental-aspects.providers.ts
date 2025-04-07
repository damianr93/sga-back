import { Mongoose } from "mongoose";
import { environmentalAspectsSchema } from "./schema/environmental-aspects.schema";



export const enviromentalAspectsProvider = [
    {
        provide: 'ENVIROMENTAL-ASPECTS-MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('enviromental-aspects', environmentalAspectsSchema),
        inject: ['DATABASE_CONNECTION']

    }
]