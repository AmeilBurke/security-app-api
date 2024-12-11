import { Test, TestingModule } from '@nestjs/testing';
import { BanDetailsService } from './ban-details.service';

describe('BanDetailsService', () => {
  let service: BanDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BanDetailsService],
    }).compile();

    service = module.get<BanDetailsService>(BanDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
