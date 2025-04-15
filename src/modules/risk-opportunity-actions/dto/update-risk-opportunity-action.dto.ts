import { PartialType } from '@nestjs/mapped-types';
import { CreateRiskOpportunityActionDto } from './create-risk-opportunity-action.dto';

export class UpdateRiskOpportunityActionDto extends PartialType(CreateRiskOpportunityActionDto) {}
