import { Module } from '@nestjs/common';
import { CriteriosService } from './criterios.service';
import { CriteriosController } from './criterios.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { criteriosProviders } from './criterios.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CriteriosController],
  providers: [CriteriosService, ...criteriosProviders],
})
export class CriteriosModule {}
