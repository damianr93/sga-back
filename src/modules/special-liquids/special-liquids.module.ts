import { Module } from '@nestjs/common';
import { SpecialLiquidsService } from './special-liquids.service';
import { SpecialLiquidsController } from './special-liquids.controller';
import { DatabaseModule } from 'src/services/database/database.module';
import { specialLiquidsProviders } from './special-liquids.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SpecialLiquidsController],
  providers: [...specialLiquidsProviders, SpecialLiquidsService],
})
export class SpecialLiquidsModule {}
