import { Module } from '@nestjs/common';
import { RiskOpportunityActionsService } from './risk-opportunity-actions.service';
import { RiskOpportunityActionsController } from './risk-opportunity-actions.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { riskOpportunityActionsProviders } from './risk-opportunity-actions.providers';
import { riskAndOportunitiesProviders } from '../risk-and-opportunities/risk-and-opportunities.providers';
import { enviromentalAspectsProvider } from '../environmental-aspects/enviromental-aspects.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RiskOpportunityActionsController],
  providers: [
    RiskOpportunityActionsService, 
    ...riskOpportunityActionsProviders,
    ...riskAndOportunitiesProviders,
    ...enviromentalAspectsProvider
  ],
})
export class RiskOpportunityActionsModule {}
