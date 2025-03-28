import mongoose from "mongoose";


export const TargetsSchema = new mongoose.Schema({
    description: { type: String, required: true}
})

TargetsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
})