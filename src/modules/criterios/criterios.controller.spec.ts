import { Test, TestingModule } from '@nestjs/testing';
import { CriteriosController } from './criterios.controller';
import { CriteriosService } from './criterios.service';

describe('CriteriosController', () => {
  let controller: CriteriosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriteriosController],
      providers: [CriteriosService],
    }).compile();

    controller = module.get<CriteriosController>(CriteriosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
