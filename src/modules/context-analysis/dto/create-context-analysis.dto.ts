import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateContextAnalysisDto {
    @ApiProperty({
        example: 'Fortaleza',
        description: 'type within the FODA analysis',
    })
    @IsString({ message: 'The type must be string' })
    @IsNotEmpty({ message: 'The type is requires' })
    @IsEnum(['Fortaleza', 'Debilidad', 'Oportunidad', 'Amenaza'],
        { message: 'type must be one of the following values: Fortaleza, Debilidad, Oportunidad, Amenaza' })
    type: string

    @ApiProperty({
        example: 'La organización cuenta con una sala de capacitación adecuada y con instalaciones necesarias para llevar a cabo las capacitaciones',
        description: 'Description of the strength, weakness, threat or opportunity',
    })
    @IsString({ message: 'Description must be string' })
    @IsNotEmpty({ message: 'Description is requires' })
    description: string
}
