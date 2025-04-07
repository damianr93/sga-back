import { IsString, IsNumber, IsNotEmpty, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCriterioDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Umbral limite a partir del cual se tomaran medidas',
        example: 'Umbral limite',
    })

    type: string;
    
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(10)
    @ApiProperty({
        description: 'Valor umbral del criterio (1-10)',
        example: 6,
        minimum: 1,
        maximum: 10
    })
    valor: number;
}
