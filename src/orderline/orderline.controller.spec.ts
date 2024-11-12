import { Test, TestingModule } from '@nestjs/testing';
import { OrderlineController } from './orderline.controller';
import { OrderlineService } from './orderline.service';

describe('OrderlineController', () => {
  let controller: OrderlineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderlineController],
      providers: [OrderlineService],
    }).compile();

    controller = module.get<OrderlineController>(OrderlineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
