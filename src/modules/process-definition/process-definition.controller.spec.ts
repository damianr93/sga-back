import { Test, TestingModule } from '@nestjs/testing';
import { ProcessDefinitionController } from './process-definition.controller';
import { ProcessDefinitionService } from './process-definition.service';

describe('ProcessDefinitionController', () => {
  let controller: ProcessDefinitionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessDefinitionController],
      providers: [ProcessDefinitionService],
    }).compile();

    controller = module.get<ProcessDefinitionController>(ProcessDefinitionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
