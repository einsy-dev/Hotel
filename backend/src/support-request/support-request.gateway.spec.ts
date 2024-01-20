import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequestGateway } from './support-request.gateway';

describe('SupportRequestGateway', () => {
  let gateway: SupportRequestGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportRequestGateway],
    }).compile();

    gateway = module.get<SupportRequestGateway>(SupportRequestGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
