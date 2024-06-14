import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialLiquidDto } from './create-special-liquid.dto';

export class UpdateSpecialLiquidDto extends PartialType(CreateSpecialLiquidDto) {}
