import { Module } from '@nestjs/common';
import { OrderlineService } from './orderline.service';
import { OrderlineController } from './orderline.controller';

@Module({
  controllers: [OrderlineController],
  providers: [OrderlineService],
})
export class OrderlineModule {}
