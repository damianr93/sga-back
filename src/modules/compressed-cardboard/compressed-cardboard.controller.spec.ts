import { Test, TestingModule } from '@nestjs/testing';
import { CompressedCardboardController } from './compressed-cardboard.controller';
import { CompressedCardboardService } from './compressed-cardboard.service';

describe('CompressedCardboardController', () => {
  let controller: CompressedCardboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompressedCardboardController],
      providers: [CompressedCardboardService],
    }).compile();

    controller = module.get<CompressedCardboardController>(CompressedCardboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
