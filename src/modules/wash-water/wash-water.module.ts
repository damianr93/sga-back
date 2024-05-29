import { Module } from '@nestjs/common';
import { WashWaterService } from './wash-water.service';
import { WashWaterController } from './wash-water.controller';

@Module({
  controllers: [WashWaterController],
  providers: [WashWaterService],
})
export class WashWaterModule {}
