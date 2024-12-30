import { Test, TestingModule } from '@nestjs/testing';
import { VenueAccessService } from './venue-access.service';

describe('VenueAccessService', () => {
  let service: VenueAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenueAccessService],
    }).compile();

    service = module.get<VenueAccessService>(VenueAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
