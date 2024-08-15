import { Test, TestingModule } from '@nestjs/testing';
import { AlertDetailsController } from './alert-details.controller';
import { AlertDetailsService } from './alert-details.service';

describe('AlertDetailsController', () => {
  let controller: AlertDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertDetailsController],
      providers: [AlertDetailsService],
    }).compile();

    controller = module.get<AlertDetailsController>(AlertDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
