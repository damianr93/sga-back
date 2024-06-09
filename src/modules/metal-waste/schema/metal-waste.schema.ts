import mongoose from "mongoose";


export const metalWasteSchema = new mongoose.Schema({
    createdBy: String,
    measurement:Number,
    createdAt: {
        type: String,
        default: new Date().toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
    },
});

metalWasteSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});