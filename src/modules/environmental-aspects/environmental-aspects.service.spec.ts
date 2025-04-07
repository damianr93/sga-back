import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentalAspectsService } from './environmental-aspects.service';

describe('EnvironmentalAspectsService', () => {
  let service: EnvironmentalAspectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentalAspectsService],
    }).compile();

    service = module.get<EnvironmentalAspectsService>(EnvironmentalAspectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
