import { Test, TestingModule } from '@nestjs/testing';
import { VenueManagersController } from './venue-managers.controller';
import { VenueManagersService } from './venue-managers.service';

describe('VenueManagersController', () => {
  let controller: VenueManagersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenueManagersController],
      providers: [VenueManagersService],
    }).compile();

    controller = module.get<VenueManagersController>(VenueManagersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
