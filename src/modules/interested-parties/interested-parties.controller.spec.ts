import { Test, TestingModule } from '@nestjs/testing';
import { InterestedPartiesController } from './interested-parties.controller';
import { InterestedPartiesService } from './interested-parties.service';

describe('InterestedPartiesController', () => {
  let controller: InterestedPartiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestedPartiesController],
      providers: [InterestedPartiesService],
    }).compile();

    controller = module.get<InterestedPartiesController>(InterestedPartiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
