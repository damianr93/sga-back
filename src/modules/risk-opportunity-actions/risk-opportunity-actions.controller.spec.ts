import { Test, TestingModule } from '@nestjs/testing';
import { RiskOpportunityActionsController } from './risk-opportunity-actions.controller';
import { RiskOpportunityActionsService } from './risk-opportunity-actions.service';

describe('RiskOpportunityActionsController', () => {
  let controller: RiskOpportunityActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskOpportunityActionsController],
      providers: [RiskOpportunityActionsService],
    }).compile();

    controller = module.get<RiskOpportunityActionsController>(RiskOpportunityActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
