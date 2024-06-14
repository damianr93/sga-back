import { Mongoose } from "mongoose";
import { userSchema } from "./schema/users.schema";


export const UserProviders = [
    {
        provide:"USER_MODEL",
        useFactory: (mongoose:Mongoose) =>
            mongoose.model("users", userSchema),
        inject:['DATABASE_CONNECTION'],
        
    }
]