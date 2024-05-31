import { Module } from '@nestjs/common';
import { SpecialWasteService } from './special-waste.service';
import { SpecialWasteController } from './special-waste.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { specialWasteProviders } from './special-waste.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [SpecialWasteController],
  providers: [...specialWasteProviders, SpecialWasteService],
})
export class SpecialWasteModule {}
