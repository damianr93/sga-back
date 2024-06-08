import { Module } from '@nestjs/common';
import { WasteService } from './waste.service';
import { WasteController } from './waste.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { wasteProviders } from './waste.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [WasteController],
  providers: [...wasteProviders, WasteService],
})
export class WasteModule {}
