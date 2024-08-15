import { Test, TestingModule } from '@nestjs/testing';
import { BannedPersonsService } from './banned-persons.service';

describe('BannedPersonsService', () => {
  let service: BannedPersonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannedPersonsService],
    }).compile();

    service = module.get<BannedPersonsService>(BannedPersonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
