import { Test, TestingModule } from '@nestjs/testing';
import { RiskOpportunityActionsService } from './risk-opportunity-actions.service';

describe('RiskOpportunityActionsService', () => {
  let service: RiskOpportunityActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskOpportunityActionsService],
    }).compile();

    service = module.get<RiskOpportunityActionsService>(RiskOpportunityActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
