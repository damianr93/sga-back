import { Test, TestingModule } from '@nestjs/testing';
import { WastesDataService } from './wastes-data.service';

describe('WastesDataService', () => {
  let service: WastesDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WastesDataService],
    }).compile();

    service = module.get<WastesDataService>(WastesDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
