import { Module } from '@nestjs/common';
import { RiskOpportunityActionsService } from './risk-opportunity-actions.service';
import { RiskOpportunityActionsController } from './risk-opportunity-actions.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { riskOpportunityActionsProviders } from './risk-opportunity-actions.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RiskOpportunityActionsController],
  providers: [RiskOpportunityActionsService, ...riskOpportunityActionsProviders],
})
export class RiskOpportunityActionsModule {}
