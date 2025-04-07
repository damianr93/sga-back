import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

enum CondicionEnum {
    EMISION = 'Emision',
    DERRAME = 'Derrame',
    RESIDUO = 'Residuo',
    VERTIDO = 'Vertido'
}

enum AffectedResourceEnum {
    AGUA = 'Agua',
    AIRE = 'Aire',
    SUELO = 'Suelo',
}

enum OperatingConditionEnum {
    NORMAL = 'Normal',
    ANORMAL = 'Anormal',
    EMERGENCIA = 'Emergencia',
}

export class CreateEnvironmentalAspectDto {
    @ApiProperty({
        example: 'ASDASD09U23',
        description: 'Id del proceso que genera el aspecto'
    })
    @IsMongoId()
    process: Types.ObjectId;

    @ApiProperty({
        example: 'Emision',
        description: 'condicion bajo la que se genera el aspecto ambiental',
        enum: CondicionEnum
    })
    @IsEnum(CondicionEnum)
    condicion: 'Emision' | 'Derrame' | 'Residuo' | 'Vertido';

    @ApiProperty({
        example: 'ASDASD09U23',
        description: 'Id del contexto que genera el aspecto'
    })
    @IsMongoId()
    context: Types.ObjectId;

    @ApiProperty({
        example: 'Aire',
        description: 'Recurso afectado en caso de suceder el aspecto ambiental',
        enum:AffectedResourceEnum
    })
    @IsEnum(AffectedResourceEnum)
    affectedResource: 'Agua' | 'Aire' | 'Suelo';

    @ApiProperty({
        example: 'Gases de soldadura',
        description: 'Elemento emitido, vertido, generado, etc'
    })
    @IsString()
    element: String;

    @ApiProperty({
        example: 'Durante los procesos de soldadura se generan gases',
        description: 'Pequeña descripcion del aspecto ambiental'
    })
    @IsString()
    description: String;

    @ApiProperty({
        example: 'Anormal',
        description: 'Condicion de operacion bajo la cual ocurre el Aspecto Ambiental',
        enum:OperatingConditionEnum
    })
    @IsEnum(OperatingConditionEnum)
    operatingCondition: 'Normal' | 'Anormal' | 'Emergencia';

    @ApiProperty({
        example: 10,
        description: 'valor numero que representa si existe o no un requisito legal'
    })
    @IsNumber()
    @IsOptional()
    legalRequeriment: Number;

    @ApiProperty({
        example: 10,
        description: 'valor numero que representa si se gestiona o no un requisito legal'
    })
    @IsNumber()
    @IsOptional()
    managementLegalRequeriment: Number;

    @ApiProperty({
        example: 'Ley 24051',
        description: 'Identificacion de la ley que abarca el aspecto ambiental'
    })
    @IsString()
    @IsOptional()
    legalRequirementNumberOrId: String;

    @ApiProperty({
        example: 'Obliga a reducir las emisiones de gases que deterioren la capa de ozono',
        description: 'Descripcion de la oblicacion que genera el requisito legal'
    })
    @IsString()
    @IsOptional()
    legalRequirementDescrption: String; //!Relacion con otro modulo, para requisitos legales

    @ApiProperty({
        example: ['6483f22d8b04ab123e5791a2', '6483f22d8b04ab123e5791a3'],
        description: 'Array de IDs de partes interesadas relacionadas con el aspecto ambiental'
    })
    @IsArray()
    @IsMongoId({ each: true })
    interestedParties: Types.ObjectId[];

    @ApiProperty({
        example: 8,
        description: 'Valor numérico de importancia para las partes interesadas'
    })
    @IsNumber()
    @IsOptional()
    interestedPartiesValue: Number;

    @ApiProperty({
        example: 7,
        description: 'Valor numérico que representa la gestión de requisitos de las partes interesadas'
    })
    @IsNumber()
    @IsOptional()
    managementRequerimentPart: Number;

    @ApiProperty({
        example: 5,
        description: 'Frecuencia con la que ocurre el impacto ambiental'
    })
    @IsNumber()
    @IsOptional()
    impactFrequency: Number;

    @ApiProperty({
        example: 6,
        description: 'Gravedad del impacto ambiental'
    })
    @IsNumber()
    @IsOptional()
    severityImpact: Number;

    @ApiProperty({
        example: 4,
        description: 'Extensión del impacto ambiental'
    })
    @IsNumber()
    @IsOptional()
    extentImpact: Number;

    @ApiProperty({
        example: 120,
        description: 'Valor de significancia calculado para el aspecto ambiental'
    })
    @IsNumber()
    @IsOptional()
    significance: Number;

}
