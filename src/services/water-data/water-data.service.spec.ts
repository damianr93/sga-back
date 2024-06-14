import { Test, TestingModule } from '@nestjs/testing';
import { WaterDataService } from './water-data.service';

describe('WaterDataService', () => {
  let service: WaterDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterDataService],
    }).compile();

    service = module.get<WaterDataService>(WaterDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
