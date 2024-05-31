import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateSpecialLiquidDto {

    @ApiProperty({
        example: 'La ecologica del Sur',
        description: 'name of the company that removes the waste',
    })
    @IsString({ message: 'carrier must be a string' })
    @IsNotEmpty({ message: 'carrier is required' })
    carrier:string

    @ApiProperty({
        example: '3200',
        description: 'total in liters',
    })
    @IsNotEmpty()
    @IsNumber()
    liters:number

    @ApiProperty({
        example: '02/01/2024',
        description: 'Date of create',
        maxLength: 50,
        minLength: 4,
    })
    createdAt:Date
}
