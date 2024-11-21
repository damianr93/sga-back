import { Module } from '@nestjs/common';
import { ProcessDefinitionService } from './process-definition.service';
import { ProcessDefinitionController } from './process-definition.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { ProcessDefinitionProviders } from './process-definition.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [ProcessDefinitionController],
  providers: [...ProcessDefinitionProviders, ProcessDefinitionService],
})
export class ProcessDefinitionModule {}
