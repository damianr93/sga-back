import { Mongoose } from "mongoose";
import { TargetsSchema } from "./schema/targets.schema";

export const targetsProviders = [
    {
        provide: "TARGETS-MODEL",
        useFactory: (mongoose:Mongoose) => mongoose.model('targets', TargetsSchema),
        inject: ["DATABASE_CONNECTION"]
    }
]