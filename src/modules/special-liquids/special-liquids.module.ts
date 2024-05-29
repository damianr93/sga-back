import { Module } from '@nestjs/common';
import { SpecialLiquidsService } from './special-liquids.service';
import { SpecialLiquidsController } from './special-liquids.controller';

@Module({
  controllers: [SpecialLiquidsController],
  providers: [SpecialLiquidsService],
})
export class SpecialLiquidsModule {}
