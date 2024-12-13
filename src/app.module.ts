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
import { AuthModule } from './auth/auth/auth.module';


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
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, MyLogger],
})
export class AppModule {}

