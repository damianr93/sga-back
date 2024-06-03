import { Module } from '@nestjs/common';
import { CompressedCardboardService } from './compressed-cardboard.service';
import { CompressedCardboardController } from './compressed-cardboard.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { compressedCardboardProviders } from './compressed-cardboard.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [CompressedCardboardController],
  providers: [...compressedCardboardProviders, CompressedCardboardService],
})
export class CompressedCardboardModule {}
