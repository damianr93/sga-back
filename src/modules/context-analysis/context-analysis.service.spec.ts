import { Test, TestingModule } from '@nestjs/testing';
import { ContextAnalysisService } from './context-analysis.service';

describe('ContextAnalysisService', () => {
  let service: ContextAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContextAnalysisService],
    }).compile();

    service = module.get<ContextAnalysisService>(ContextAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
