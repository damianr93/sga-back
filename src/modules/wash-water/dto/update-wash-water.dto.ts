import { PartialType } from '@nestjs/mapped-types';
import { CreateWashWaterDto } from './create-wash-water.dto';

export class UpdateWashWaterDto extends PartialType(CreateWashWaterDto) {}
