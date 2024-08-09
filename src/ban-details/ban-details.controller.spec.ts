import { Test, TestingModule } from '@nestjs/testing';
import { BanDetailsController } from './ban-details.controller';
import { BanDetailsService } from './ban-details.service';

describe('BanDetailsController', () => {
  let controller: BanDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BanDetailsController],
      providers: [BanDetailsService],
    }).compile();

    controller = module.get<BanDetailsController>(BanDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
