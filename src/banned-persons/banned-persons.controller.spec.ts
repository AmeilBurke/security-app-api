import { Test, TestingModule } from '@nestjs/testing';
import { BannedPersonsController } from './banned-persons.controller';
import { BannedPersonsService } from './banned-persons.service';

describe('BannedPersonsController', () => {
  let controller: BannedPersonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannedPersonsController],
      providers: [BannedPersonsService],
    }).compile();

    controller = module.get<BannedPersonsController>(BannedPersonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
