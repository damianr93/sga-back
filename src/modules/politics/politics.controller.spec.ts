import { Test, TestingModule } from '@nestjs/testing';
import { PoliticsController } from './politics.controller';
import { PoliticsService } from './politics.service';

describe('PoliticsController', () => {
  let controller: PoliticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliticsController],
      providers: [PoliticsService],
    }).compile();

    controller = module.get<PoliticsController>(PoliticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
