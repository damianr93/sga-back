import mongoose from "mongoose";


export const userSchema = new mongoose.Schema({
    username: String,
    sector: String,
    password: String
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options)  {
        delete ret._id;
    }
});