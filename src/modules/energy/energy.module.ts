import { Module } from '@nestjs/common';
import { EnergyService } from './energy.service';
import { EnergyController } from './energy.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { energyProviders } from './energy.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [EnergyController],
  providers: [...energyProviders, EnergyService],
})
export class EnergyModule {}
