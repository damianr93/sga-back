import { Module } from '@nestjs/common';
import { WaterService } from './water.service';
import { WaterController } from './water.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { waterProviders } from './water.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [WaterController],
  providers: [...waterProviders, WaterService],
})
export class WaterModule {}
