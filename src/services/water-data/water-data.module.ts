import { Module } from '@nestjs/common';
import { WaterDataService } from './water-data.service';
import { WaterDataController } from './water-data.controller';
import { DatabaseModule } from '../database/database.module';
import { waterProviders } from 'src/modules/water/water.providers';
import { washWaterProviders } from 'src/modules/wash-water/wach-water.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [WaterDataController],
  providers: [
    ...waterProviders,
    ...washWaterProviders,
    WaterDataService
  ],
})
export class WaterDataModule { }
