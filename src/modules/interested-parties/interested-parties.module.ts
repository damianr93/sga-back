import { Module } from '@nestjs/common';
import { InterestedPartiesService } from './interested-parties.service';
import { InterestedPartiesController } from './interested-parties.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { interestedPartiesProvider } from './interested-parties.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [InterestedPartiesController],
  providers: [...interestedPartiesProvider, InterestedPartiesService],
})
export class InterestedPartiesModule {}
