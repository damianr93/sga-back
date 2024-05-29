import { Module } from '@nestjs/common';
import { MetalWasteService } from './metal-waste.service';
import { MetalWasteController } from './metal-waste.controller';

@Module({
  controllers: [MetalWasteController],
  providers: [MetalWasteService],
})
export class MetalWasteModule {}
