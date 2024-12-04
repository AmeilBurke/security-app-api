import { Test, TestingModule } from '@nestjs/testing';
import { AlertDetailsGateway } from './alert-details.gateway';
import { AlertDetailsService } from './alert-details.service';

describe('AlertDetailsGateway', () => {
  let gateway: AlertDetailsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertDetailsGateway, AlertDetailsService],
    }).compile();

    gateway = module.get<AlertDetailsGateway>(AlertDetailsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
