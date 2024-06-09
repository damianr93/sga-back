import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateSpecialWasteDto {
    @ApiProperty({
        example: 'Amigacho',
        description: 'name of the person taking the measurement',
    })
    @IsString({ message: 'name must be a string' })
    @IsNotEmpty({ message: 'name is required' })
    createdBy:string

    @ApiProperty({
        example: '1.3562',
        description: 'total in bags',
    })
    @IsNotEmpty()
    @IsNumber()
    measurement:number

    @ApiProperty({
        example: '02/01/2024',
        description: 'Date of create',
        maxLength: 50,
        minLength: 4,
    })
    createdAt:string
}
