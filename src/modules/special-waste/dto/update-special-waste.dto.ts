import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialWasteDto } from './create-special-waste.dto';

export class UpdateSpecialWasteDto extends PartialType(CreateSpecialWasteDto) {}
