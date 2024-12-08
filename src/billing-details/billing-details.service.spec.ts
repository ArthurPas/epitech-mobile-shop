import { Test, TestingModule } from '@nestjs/testing';
import { BillingDetailsService } from './billing-details.service';

describe('BillingDetailsService', () => {
  let service: BillingDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingDetailsService],
    }).compile();

    service = module.get<BillingDetailsService>(BillingDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
