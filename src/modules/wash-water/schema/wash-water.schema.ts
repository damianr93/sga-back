import mongoose from "mongoose";

export const washWaterSchema = new mongoose.Schema({
    medidoPor: String,
    consumo: {
        type:Number,
        require: true
    },
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

washWaterSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});