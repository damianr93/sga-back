import { PartialType } from '@nestjs/mapped-types';
import { CreateWaterDatumDto } from './create-water-datum.dto';

export class UpdateWaterDatumDto extends PartialType(CreateWaterDatumDto) {}
