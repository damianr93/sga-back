import { Module } from '@nestjs/common';
import { RiskAndOpportunitiesService } from './risk-and-opportunities.service';
import { RiskAndOpportunitiesController } from './risk-and-opportunities.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { riskAndOportunitiesProviders } from './risk-and-opportunities.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RiskAndOpportunitiesController],
  providers: [RiskAndOpportunitiesService, ...riskAndOportunitiesProviders],
})
export class RiskAndOpportunitiesModule {}
