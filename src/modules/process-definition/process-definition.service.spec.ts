import { Test, TestingModule } from '@nestjs/testing';
import { ProcessDefinitionService } from './process-definition.service';

describe('ProcessDefinitionService', () => {
  let service: ProcessDefinitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessDefinitionService],
    }).compile();

    service = module.get<ProcessDefinitionService>(ProcessDefinitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
