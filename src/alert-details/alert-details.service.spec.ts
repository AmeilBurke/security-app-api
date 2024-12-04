import { Test, TestingModule } from '@nestjs/testing';
import { AlertDetailsService } from './alert-details.service';

describe('AlertDetailsService', () => {
  let service: AlertDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertDetailsService],
    }).compile();

    service = module.get<AlertDetailsService>(AlertDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
