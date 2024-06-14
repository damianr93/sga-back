import { Module } from '@nestjs/common';
import { WashWaterService } from './wash-water.service';
import { WashWaterController } from './wash-water.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { washWaterProviders } from './wach-water.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [WashWaterController],
  providers: [...washWaterProviders, WashWaterService],
})
export class WashWaterModule {}
