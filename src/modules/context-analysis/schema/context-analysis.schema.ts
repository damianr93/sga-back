import mongoose from "mongoose";

export const contextAnalysisSchema = new mongoose.Schema({
    type:String,
    description: String,
});

contextAnalysisSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});