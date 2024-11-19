import { Module } from '@nestjs/common';
import { BillingDetailsService } from './billing-details.service';
import { BillingDetailsController } from './billing-details.controller';

@Module({
  controllers: [BillingDetailsController],
  providers: [BillingDetailsService],
})
export class BillingDetailsModule {}
