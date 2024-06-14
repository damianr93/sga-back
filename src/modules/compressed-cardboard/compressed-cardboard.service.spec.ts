import { Test, TestingModule } from '@nestjs/testing';
import { CompressedCardboardService } from './compressed-cardboard.service';

describe('CompressedCardboardService', () => {
  let service: CompressedCardboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompressedCardboardService],
    }).compile();

    service = module.get<CompressedCardboardService>(CompressedCardboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
