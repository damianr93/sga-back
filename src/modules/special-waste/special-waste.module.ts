import { Module } from '@nestjs/common';
import { SpecialWasteService } from './special-waste.service';
import { SpecialWasteController } from './special-waste.controller';

@Module({
  controllers: [SpecialWasteController],
  providers: [SpecialWasteService],
})
export class SpecialWasteModule {}
