import mongoose from "mongoose";

export const interestedPartiesSchema = new mongoose.Schema({
    name:String,
    requirement:String,
    legalRequirement:Boolean,
    intExt: String

});

interestedPartiesSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});