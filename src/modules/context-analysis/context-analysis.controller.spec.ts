import { Test, TestingModule } from '@nestjs/testing';
import { ContextAnalysisController } from './context-analysis.controller';
import { ContextAnalysisService } from './context-analysis.service';

describe('ContextAnalysisController', () => {
  let controller: ContextAnalysisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContextAnalysisController],
      providers: [ContextAnalysisService],
    }).compile();

    controller = module.get<ContextAnalysisController>(ContextAnalysisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
