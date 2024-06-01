import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCompressedCardboardDto {
    
    @ApiProperty({
        example: 'Damian',
        description: 'name of the person taking the measurement',
    })
    @IsString({ message: 'user must be a string' })
    @IsNotEmpty({ message: 'user is required' })
    medidoPor:string
    
    @ApiProperty({
        example: '3,60',
        description: 'total in compressed',
    })
    @IsNotEmpty()
    @IsNumber()
    measure:number
    
    @ApiProperty({
        example: '02/01/2024',
        description: 'Date of create',
        maxLength: 50,
        minLength: 4,
    })
    createdAt:Date
}
