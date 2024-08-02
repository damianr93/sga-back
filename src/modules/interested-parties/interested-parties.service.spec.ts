import { Test, TestingModule } from '@nestjs/testing';
import { InterestedPartiesService } from './interested-parties.service';

describe('InterestedPartiesService', () => {
  let service: InterestedPartiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestedPartiesService],
    }).compile();

    service = module.get<InterestedPartiesService>(InterestedPartiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
