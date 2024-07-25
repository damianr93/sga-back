import { Mongoose } from "mongoose";
import { contextAnalysisSchema } from "./schema/context-analysis.schema";


export const contextAnalysisProvider = [
    {
        provide:'CONTEXT-ANALYSIS-MODEL',
        useFactory:(mongoose:Mongoose) => mongoose.model('context-analysis', contextAnalysisSchema),
        inject:['DATABASE_CONNECTION']
    }
]