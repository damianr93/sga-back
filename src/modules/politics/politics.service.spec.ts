import { Test, TestingModule } from '@nestjs/testing';
import { PoliticsService } from './politics.service';

describe('PoliticsService', () => {
  let service: PoliticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliticsService],
    }).compile();

    service = module.get<PoliticsService>(PoliticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
