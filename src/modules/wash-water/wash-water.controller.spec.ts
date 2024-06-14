import { Test, TestingModule } from '@nestjs/testing';
import { WashWaterController } from './wash-water.controller';
import { WashWaterService } from './wash-water.service';

describe('WashWaterController', () => {
  let controller: WashWaterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WashWaterController],
      providers: [WashWaterService],
    }).compile();

    controller = module.get<WashWaterController>(WashWaterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
