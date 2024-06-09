import { PartialType } from '@nestjs/mapped-types';
import { CreateWastesDatumDto } from './create-wastes-datum.dto';

export class UpdateWastesDatumDto extends PartialType(CreateWastesDatumDto) {}
