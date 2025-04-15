import { Module } from '@nestjs/common';
import { RiskAndOpportunitiesService } from './risk-and-opportunities.service';
import { RiskAndOpportunitiesController } from './risk-and-opportunities.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { riskAndOportunitiesProviders } from './risk-and-opportunities.providers';
import { criteriosProviders } from '../criterios/criterios.providers';
import { riskOpportunityActionsProviders } from '../risk-opportunity-actions/risk-opportunity-actions.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RiskAndOpportunitiesController],
  providers: [
    RiskAndOpportunitiesService, 
    ...riskAndOportunitiesProviders,
    ...criteriosProviders,
    ...riskOpportunityActionsProviders
  
  ],
})
export class RiskAndOpportunitiesModule {}
