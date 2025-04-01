import { PartialType } from '@nestjs/mapped-types';
import { CreateRiskAndOpportunityDto } from './create-risk-and-opportunity.dto';

export class UpdateRiskAndOpportunityDto extends PartialType(CreateRiskAndOpportunityDto) {}
