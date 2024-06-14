import { Module } from '@nestjs/common';
import { MetalWasteService } from './metal-waste.service';
import { MetalWasteController } from './metal-waste.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { metalWasteProviders } from './metal-waste.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [MetalWasteController],
  providers: [...metalWasteProviders, MetalWasteService],
})
export class MetalWasteModule {}
