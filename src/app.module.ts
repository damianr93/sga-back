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
     
  ],
  controllers: [AppController],
  providers: [AppService, MyLogger],
})
export class AppModule {}

