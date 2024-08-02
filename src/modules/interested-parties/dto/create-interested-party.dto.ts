import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator"

export class CreateInterestedPartyDto {

    @ApiProperty({
        example: 'Toyota',
        description: 'name of the interested parties',
    })
    @IsNotEmpty({ message: 'name is requires' })
    @IsString({message:'name must be a string'})
    name:String

    @ApiProperty({
        example: 'Cumplir con el programa ecologico',
        description: 'requirement of the interested parties',
    })
    @IsNotEmpty({ message: 'requirement is requires' })
    @IsString({message:'requirement must be a string'})
    requirement:String

    @IsNotEmpty({ message: 'legalRequirement is requires' })
    @IsBoolean({message:'legal requirement must be a boolean'})
    legalRequirement:Boolean

    @ApiProperty({
        example: 'Externo',
        description: '',
    })
    @IsString({ message: 'intExt must be string' })
    @IsNotEmpty({ message: 'intExt is requires' })
    @IsEnum(['Interno', 'Externo'],
        { message: 'intExt must be one of the following values: Interno, Externo' })
    intExt: String
}
