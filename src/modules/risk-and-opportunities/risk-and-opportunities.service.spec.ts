import { Test, TestingModule } from '@nestjs/testing';
import { RiskAndOpportunitiesService } from './risk-and-opportunities.service';

describe('RiskAndOpportunitiesService', () => {
  let service: RiskAndOpportunitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskAndOpportunitiesService],
    }).compile();

    service = module.get<RiskAndOpportunitiesService>(RiskAndOpportunitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
