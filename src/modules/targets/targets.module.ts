import { Module } from '@nestjs/common';
import { TargetsService } from './targets.service';
import { TargetsController } from './targets.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { targetsProviders } from './targets.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TargetsController],
  providers: [TargetsService, ...targetsProviders],
})
export class TargetsModule {}
