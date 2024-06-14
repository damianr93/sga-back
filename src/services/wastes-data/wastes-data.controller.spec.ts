import { Test, TestingModule } from '@nestjs/testing';
import { WastesDataController } from './wastes-data.controller';
import { WastesDataService } from './wastes-data.service';

describe('WastesDataController', () => {
  let controller: WastesDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WastesDataController],
      providers: [WastesDataService],
    }).compile();

    controller = module.get<WastesDataController>(WastesDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
