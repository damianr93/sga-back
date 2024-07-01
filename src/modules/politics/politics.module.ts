import { Module } from '@nestjs/common';
import { PoliticsService } from './politics.service';
import { PoliticsController } from './politics.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { politicsProviders } from './politics.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [PoliticsController],
  providers: [...politicsProviders, PoliticsService],
})
export class PoliticsModule {}
