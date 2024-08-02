import { PartialType } from '@nestjs/mapped-types';
import { CreateContextAnalysisDto } from './create-context-analysis.dto';

export class UpdateContextAnalysisDto extends PartialType(CreateContextAnalysisDto) {}
