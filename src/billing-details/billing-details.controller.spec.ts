import { Test, TestingModule } from '@nestjs/testing';
import { BillingDetailsController } from './billing-details.controller';
import { BillingDetailsService } from './billing-details.service';

describe('BillingDetailsController', () => {
  let controller: BillingDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingDetailsController],
      providers: [BillingDetailsService],
    }).compile();

    controller = module.get<BillingDetailsController>(BillingDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
