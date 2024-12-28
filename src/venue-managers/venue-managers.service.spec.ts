import { Test, TestingModule } from '@nestjs/testing';
import { VenueManagersService } from './venue-managers.service';

describe('VenueManagersService', () => {
  let service: VenueManagersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenueManagersService],
    }).compile();

    service = module.get<VenueManagersService>(VenueManagersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
