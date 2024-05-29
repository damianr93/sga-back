import { Test, TestingModule } from '@nestjs/testing';
import { MetalWasteController } from './metal-waste.controller';
import { MetalWasteService } from './metal-waste.service';

describe('MetalWasteController', () => {
  let controller: MetalWasteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetalWasteController],
      providers: [MetalWasteService],
    }).compile();

    controller = module.get<MetalWasteController>(MetalWasteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
