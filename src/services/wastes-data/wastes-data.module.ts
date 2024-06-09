import { Module } from '@nestjs/common';
import { WastesDataService } from './wastes-data.service';
import { WastesDataController } from './wastes-data.controller';
import { DatabaseModule } from '../database/database.module';
import { metalWasteProviders } from 'src/modules/metal-waste/metal-waste.providers';
import { compressedCardboardProviders } from 'src/modules/compressed-cardboard/compressed-cardboard.providers';
import { specialLiquidsProviders } from 'src/modules/special-liquids/special-liquids.providers';
import { specialWasteProviders } from 'src/modules/special-waste/special-waste.providers';
import { wasteProviders } from 'src/modules/waste/waste.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [WastesDataController],
  providers: [
    ...metalWasteProviders,
    ...compressedCardboardProviders,
    ...specialLiquidsProviders,
    ...specialWasteProviders,
    ...wasteProviders,
    WastesDataService
  ],
})
export class WastesDataModule {}
