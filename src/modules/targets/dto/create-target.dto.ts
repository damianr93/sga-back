import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateTargetDto {

    @IsOptional()
    id:string

    @ApiProperty(
        {
            description: 'The name of the target',
            example: 'Target 1'
        }
    )
    @IsString()
    description: string;

}
