import { PartialType } from '@nestjs/mapped-types';
import { CreateEnvironmentalAspectDto } from './create-environmental-aspect.dto';

export class UpdateEnvironmentalAspectDto extends PartialType(CreateEnvironmentalAspectDto) {}
