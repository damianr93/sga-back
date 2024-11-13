import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessDefinitionDto } from './create-process-definition.dto';

export class UpdateProcessDefinitionDto extends PartialType(CreateProcessDefinitionDto) {}
