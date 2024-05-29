import { Test, TestingModule } from '@nestjs/testing';
import { WashWaterService } from './wash-water.service';

describe('WashWaterService', () => {
  let service: WashWaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WashWaterService],
    }).compile();

    service = module.get<WashWaterService>(WashWaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
