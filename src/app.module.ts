import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLogger } from './services/logger/logger';
import { ConfigModule } from '@nestjs/config';
import { WaterModule } from './modules/water/water.module';
import { WashWaterModule } from './modules/wash-water/wash-water.module';
import { MetalWasteModule } from './modules/metal-waste/metal-waste.module';
import { SpecialLiquidsModule } from './modules/special-liquids/special-liquids.module';
import { SpecialWasteModule } from './modules/special-waste/special-waste.module';
import { UsersModule } from './modules/users/users.module';
import { EnergyModule } from './modules/energy/energy.module';
import { CompressedCardboardModule } from './modules/compressed-cardboard/compressed-cardboard.module';
import { WasteModule } from './modules/waste/waste.module';
import { WastesDataModule } from './services/wastes-data/wastes-data.module';
import { WaterDataModule } from './services/water-data/water-data.module';
import { PoliticsModule } from './modules/politics/politics.module';
import { ContextAnalysisModule } from './modules/context-analysis/context-analysis.module';
import { InterestedPartiesModule } from './modules/interested-parties/interested-parties.module';
import { ProcessDefinitionModule } from './modules/process-definition/process-definition.module';
import { AuthModule } from './modules/auth/auth.module';
import { TargetsModule } from './modules/targets/targets.module';
import { RiskAndOpportunitiesModule } from './modules/risk-and-opportunities/risk-and-opportunities.module';
import { CriteriosModule } from './modules/criterios/criterios.module';
import { EnvironmentalAspectsModule } from './modules/environmental-aspects/environmental-aspects.module';
import { RiskOpportunityActionsModule } from './modules/risk-opportunity-actions/risk-opportunity-actions.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WaterModule,
    WashWaterModule,
    MetalWasteModule,
    SpecialLiquidsModule,
    SpecialWasteModule,
    UsersModule,
    EnergyModule,
    CompressedCardboardModule,
    WasteModule,
    WastesDataModule,
    WaterDataModule,
    PoliticsModule,
    ContextAnalysisModule,
    InterestedPartiesModule,
    ProcessDefinitionModule,
    TargetsModule,
    AuthModule,
    RiskAndOpportunitiesModule,
    CriteriosModule,
    EnvironmentalAspectsModule,
    RiskOpportunityActionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, MyLogger],
})
export class AppModule {}

