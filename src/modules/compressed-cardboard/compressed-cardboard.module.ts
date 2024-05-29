import { Module } from '@nestjs/common';
import { CompressedCardboardService } from './compressed-cardboard.service';
import { CompressedCardboardController } from './compressed-cardboard.controller';

@Module({
  controllers: [CompressedCardboardController],
  providers: [CompressedCardboardService],
})
export class CompressedCardboardModule {}
