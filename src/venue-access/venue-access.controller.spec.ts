import { Test, TestingModule } from '@nestjs/testing';
import { VenueAccessController } from './venue-access.controller';
import { VenueAccessService } from './venue-access.service';

describe('VenueAccessController', () => {
  let controller: VenueAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenueAccessController],
      providers: [VenueAccessService],
    }).compile();

    controller = module.get<VenueAccessController>(VenueAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
