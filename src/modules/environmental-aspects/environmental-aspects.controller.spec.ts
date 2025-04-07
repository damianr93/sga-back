import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentalAspectsController } from './environmental-aspects.controller';
import { EnvironmentalAspectsService } from './environmental-aspects.service';

describe('EnvironmentalAspectsController', () => {
  let controller: EnvironmentalAspectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvironmentalAspectsController],
      providers: [EnvironmentalAspectsService],
    }).compile();

    controller = module.get<EnvironmentalAspectsController>(EnvironmentalAspectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
