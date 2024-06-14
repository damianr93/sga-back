import { Test, TestingModule } from '@nestjs/testing';
import { MetalWasteService } from './metal-waste.service';

describe('MetalWasteService', () => {
  let service: MetalWasteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetalWasteService],
    }).compile();

    service = module.get<MetalWasteService>(MetalWasteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
