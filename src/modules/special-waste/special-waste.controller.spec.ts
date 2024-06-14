import { Test, TestingModule } from '@nestjs/testing';
import { SpecialWasteController } from './special-waste.controller';
import { SpecialWasteService } from './special-waste.service';

describe('SpecialWasteController', () => {
  let controller: SpecialWasteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialWasteController],
      providers: [SpecialWasteService],
    }).compile();

    controller = module.get<SpecialWasteController>(SpecialWasteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
