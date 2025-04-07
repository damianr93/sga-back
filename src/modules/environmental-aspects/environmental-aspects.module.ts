import { Module } from '@nestjs/common';
import { EnvironmentalAspectsService } from './environmental-aspects.service';
import { EnvironmentalAspectsController } from './environmental-aspects.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { enviromentalAspectsProvider } from './enviromental-aspects.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EnvironmentalAspectsController],
  providers: [EnvironmentalAspectsService, ...enviromentalAspectsProvider],
})
export class EnvironmentalAspectsModule {}
