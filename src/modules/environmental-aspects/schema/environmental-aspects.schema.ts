import mongoose, { Schema } from "mongoose";


export const environmentalAspectsSchema = new mongoose.Schema({
    process: {
        type: Schema.Types.ObjectId,
        ref: 'processDef',
        required: true
    },
    condicion: {
        type:String,
        enum: ['Emision', 'Derrame', 'Residuo', 'Vertido']
    },
    context: {
        type: Schema.Types.ObjectId,
        ref: 'context-analysis',
        required: true
    },
    affectedResource: {
        type:String,
        enum:['Agua','Aire','Suelo']
    },
    element: String,
    description:String,
    operatingCondition: {
        type:String,
        enum:['Normal', 'Anormal', 'Emergencia']
    },
    legalRequeriment:Number,
    managementLegalRequeriment:Number,
    legalRequirementNumberOrId:String,
    legalRequirementDescrption: String, //!Relacion con otro modulo, para requisitos legales
    interestedParties: [{
        type: Schema.Types.ObjectId,
        ref: 'interested-parties'
    }],
    interestedPartiesValue:Number,
    managementRequerimentPart:Number,
    impactFrequency:Number,
    severityImpact:Number,
    extentImpact:Number,
    significance:Number

})

environmentalAspectsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        delete ret._id;
    },
});