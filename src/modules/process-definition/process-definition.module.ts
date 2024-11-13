import { Module } from '@nestjs/common';
import { ProcessDefinitionService } from './process-definition.service';
import { ProcessDefinitionController } from './process-definition.controller';

@Module({
  controllers: [ProcessDefinitionController],
  providers: [ProcessDefinitionService],
})
export class ProcessDefinitionModule {}
