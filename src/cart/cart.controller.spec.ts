import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { mockInventoryService } from '../inventory/test-data';
import { mockOrderService } from '../order/test-data';
import { mockOrderlineService } from '../orderline/test-data';
import { mockShopService } from '../shop/test-data';
import { mockProductService } from '../product/test-data';
import { Inventory } from '../inventory/entities/inventory.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';
import { Orderline } from '../orderline/entities/orderline.entity';
import { Shop } from '../shop/entities/shop.entity';
import { Product } from '../product/entities/product.entity';

describe('InventoryController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Inventory),
          useValue: mockInventoryService,
        },
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderService,
        },
        {
          provide: getRepositoryToken(Orderline),
          useValue: mockOrderlineService,
        },
        {
          provide: getRepositoryToken(Shop),
          useValue: mockShopService,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
