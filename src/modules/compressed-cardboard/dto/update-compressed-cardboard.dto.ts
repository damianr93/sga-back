import { PartialType } from '@nestjs/mapped-types';
import { CreateCompressedCardboardDto } from './create-compressed-cardboard.dto';

export class UpdateCompressedCardboardDto extends PartialType(CreateCompressedCardboardDto) {}
