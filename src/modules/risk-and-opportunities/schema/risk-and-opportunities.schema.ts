import mongoose, { Schema } from "mongoose";

export const riskAndOpportunitiesShema = new mongoose.Schema({

    contexto: {
        type: Schema.Types.ObjectId,
        ref: 'context-analysis',
        required: true
    },
    partesInteresadas: {
        type: Schema.Types.ObjectId,
        ref: 'interested-parties',
        required: true
    },
    process: {
        type: Schema.Types.ObjectId,
        ref: 'processDef',
        required: true
    },
    type: {
        type: String,
        enum: ['riesgo', 'oportunidad'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    probabilidad:String,
    ocurrencia:String,
    probabilidadDeOcurencia:Number,
    perdidaDeClientesPotencial:String,
    dañoPotencial:String,
    conflictosGremialesPosibles:String,
    incumplimientoLegal:String,
    perdidaDeImagen:String,
    costoCorreccion:String,
    consecuencia:Number,
    factorDeRiesgo:Number,
    



})

riskAndOpportunitiesShema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});