import {Mongoose}  from "mongoose";
import { politicsSchema } from "./schema/politics.schema";


export const politicsProviders = [
    {
        provide:'POLITICS-MODEL',
        useFactory:(mongoose:Mongoose) => mongoose.model('politics', politicsSchema),
        inject:['DATABASE_CONNECTION']
    }
];