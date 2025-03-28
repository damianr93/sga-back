import mongoose from "mongoose";


export const processDefinitionSchema = new mongoose.Schema({

    area:String,
    name:String,
    type:String,
    description:String,
    alcanzado: {
        type:Boolean,
        default: false
    }

});

processDefinitionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});