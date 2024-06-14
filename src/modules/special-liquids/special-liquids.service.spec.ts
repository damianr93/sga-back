import { Test, TestingModule } from '@nestjs/testing';
import { SpecialLiquidsService } from './special-liquids.service';

describe('SpecialLiquidsService', () => {
  let service: SpecialLiquidsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialLiquidsService],
    }).compile();

    service = module.get<SpecialLiquidsService>(SpecialLiquidsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
