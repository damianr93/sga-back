import { Types } from "mongoose";


export interface EnvironmentalAspects {

    process: Types.ObjectId;
    condicion: 'Emision'| 'Derrame'| 'Residuo'| 'Vertido';
    context: Types.ObjectId;
    affectedResource: 'Agua' |'Aire' |'Suelo';
    element: String;
    description:String;
    operatingCondition: 'Normal'| 'Anormal'| 'Emergencia';
    legalRequeriment:Number;
    managementLegalRequeriment:Number;
    legalRequirementNumberOrId:String;
    legalRequirementDescrption: String; //!Relacion con otro modulo, para requisitos legales
    interestedParties: Types.ObjectId[];
    interestedPartiesValue:Number;
    managementRequerimentPart:Number;
    impactFrequency:Number;
    severityImpact:Number;
    extentImpact:Number;
    significance:Number
}