import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, isString, IsString } from "class-validator";

export class CreateProcessDefinitionDto {

    @ApiProperty({
        example:'Chapa y pintura',
        description:'area responsible for the process'
    })
    @IsString({message:'area must be string'})
    area:String;

    @ApiProperty({
        example:'Ventas',
        description:'name of the process'
    })
    @IsString({message:'name must be string'})
    name:String;

    @ApiProperty({
        example:'principal ',
        description:'type of the process for the company'
    })
    @IsNotEmpty({ message: 'Type of the process is requires' })
    @IsEnum(['Principal', 'Operativo', 'Soporte', 'Gestion'],
        {message:'type must be one of the following values: Principal, operativo, soporte o gestion'})
    type:String;

    @ApiProperty({
        example:'Venta directa de vehiculos nuevos y usados',
        description:'description to process'
    })
    @IsString({message:'description is string'})
    @IsNotEmpty({message:'description is required'})
    description:String;

    @ApiProperty({
        example:'Venta de usados, venta de 0km, etc'
    })
    subProcess:[String];

};
