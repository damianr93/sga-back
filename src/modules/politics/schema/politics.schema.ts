import mongoose from "mongoose";



export const politicsSchema = new mongoose.Schema({
    introduction:String,
    politics:[String]
});

politicsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});