import { Test, TestingModule } from '@nestjs/testing';
import { RiskAndOpportunitiesController } from './risk-and-opportunities.controller';
import { RiskAndOpportunitiesService } from './risk-and-opportunities.service';

describe('RiskAndOpportunitiesController', () => {
  let controller: RiskAndOpportunitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskAndOpportunitiesController],
      providers: [RiskAndOpportunitiesService],
    }).compile();

    controller = module.get<RiskAndOpportunitiesController>(RiskAndOpportunitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
