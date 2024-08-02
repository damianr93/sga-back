import { Module } from '@nestjs/common';
import { ContextAnalysisService } from './context-analysis.service';
import { ContextAnalysisController } from './context-analysis.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { contextAnalysisProvider } from './context-analysis.provider';

@Module({
  imports:[DatabaseModule],
  controllers: [ContextAnalysisController],
  providers: [...contextAnalysisProvider, ContextAnalysisService],
})
export class ContextAnalysisModule {}
