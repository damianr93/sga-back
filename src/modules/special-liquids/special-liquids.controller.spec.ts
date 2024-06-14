import { Test, TestingModule } from '@nestjs/testing';
import { SpecialLiquidsController } from './special-liquids.controller';
import { SpecialLiquidsService } from './special-liquids.service';

describe('SpecialLiquidsController', () => {
  let controller: SpecialLiquidsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialLiquidsController],
      providers: [SpecialLiquidsService],
    }).compile();

    controller = module.get<SpecialLiquidsController>(SpecialLiquidsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
