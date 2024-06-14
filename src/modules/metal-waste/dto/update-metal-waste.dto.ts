import { PartialType } from '@nestjs/mapped-types';
import { CreateMetalWasteDto } from './create-metal-waste.dto';

export class UpdateMetalWasteDto extends PartialType(CreateMetalWasteDto) {}
