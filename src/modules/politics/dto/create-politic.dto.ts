import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsString, MinLength } from "class-validator"

export class CreatePoliticDto {
    
    @ApiProperty({
        example: 'Nuestra politica empresarial...',
        description: 'introduction to organization politics',
    })
    @IsString({message:'Introduction must be a string'})
    introduction:String;
    
    @ApiProperty({
        example:'Un control y uso racional de los recursos renovables, en el lavado de vehículos, y en el uso de la energía eléctrica dentro de la empresa',
        description:'commitments assumed by the company'
    })
    @IsArray({message:'politics must be array'})
    politics:[];
};
