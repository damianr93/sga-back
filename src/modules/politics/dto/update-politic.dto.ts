import { PartialType } from '@nestjs/mapped-types';
import { CreatePoliticDto } from './create-politic.dto';

export class UpdatePoliticDto extends PartialType(CreatePoliticDto) {}
