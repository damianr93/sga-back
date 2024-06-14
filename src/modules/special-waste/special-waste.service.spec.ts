import { Test, TestingModule } from '@nestjs/testing';
import { SpecialWasteService } from './special-waste.service';

describe('SpecialWasteService', () => {
  let service: SpecialWasteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialWasteService],
    }).compile();

    service = module.get<SpecialWasteService>(SpecialWasteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
