import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMetalWasteDto {
    @ApiProperty({
        example: 'Damian',
        description: 'name of the person taking the measurement',
    })
    @IsString({ message: 'user must be a string' })
    @IsNotEmpty({ message: 'user is required' })
    createdBy: string;

    @ApiProperty({
        example: '360',
        description: 'total in kg',
    })
    @IsNotEmpty()
    @IsNumber()
    measurement: number;

    @ApiProperty({
        example: '02/01/2024',
        description: 'Date of create',
        maxLength: 50,
        minLength: 4,
    })
    createdAt: Date;
}
