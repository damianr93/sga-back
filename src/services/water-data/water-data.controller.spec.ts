import { Test, TestingModule } from '@nestjs/testing';
import { WaterDataController } from './water-data.controller';
import { WaterDataService } from './water-data.service';

describe('WaterDataController', () => {
  let controller: WaterDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterDataController],
      providers: [WaterDataService],
    }).compile();

    controller = module.get<WaterDataController>(WaterDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
