import mongoose from "mongoose";

export const compressedCardboardSchema = new mongoose.Schema({
    medidoPor: String,
    measure: Number,
    createdAt: {
        type: String,
        default: new Date().toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
    }
});