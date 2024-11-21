import { Mongoose } from "mongoose";
import { processDefinitionSchema } from "./schema/process-definition.schema";


export const ProcessDefinitionProviders = [
    {
        provide:"PROCCES_DEFINITION_MODEL",
        useFactory: (mongoose:Mongoose) =>
            mongoose.model("processDef", processDefinitionSchema),
        inject:['DATABASE_CONNECTION'],
        
    }
]