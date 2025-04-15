import { Module } from '@nestjs/common';
import { CriteriosService } from './criterios.service';
import { CriteriosController } from './criterios.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { criteriosProviders } from './criterios.providers';
import { enviromentalAspectsProvider } from '../environmental-aspects/enviromental-aspects.providers';
import { riskAndOportunitiesProviders } from '../risk-and-opportunities/risk-and-opportunities.providers';
import { riskOpportunityActionsProviders } from '../risk-opportunity-actions/risk-opportunity-actions.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CriteriosController],
  providers: [
    CriteriosService, 
    ...criteriosProviders,
    ...enviromentalAspectsProvider,
    ...riskAndOportunitiesProviders,
    ...riskOpportunityActionsProviders
  ],
})
export class CriteriosModule {}
