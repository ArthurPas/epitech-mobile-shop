import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';
import { Orderline } from 'src/orderline/entities/orderline.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Orderline)
    private readonly orderlineRepository: Repository<Orderline>,
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async newOrdelineByNewProduct(
    productId: number,
    orderId: number,
    shopId: number,
  ) {
    const shop = await this.shopRepository.findOne({ where: { id: shopId } });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const inventory = await this.inventoryRepository.findOne({
      where: { product: product, shop: shop },
    });
    if (inventory.quantity < 1) {
      throw new Error('Out of stock');
    }

    const price = inventory.price;
    const orderlineData = {
      productId: product.id,
      orderId: orderId,
      price_at_order: price,
      quantity: 1,
    };
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });
    const orderLine = this.orderlineRepository.create(orderlineData);
    await this.orderlineRepository.save(orderLine);
    await this.updateOrderTotalPrice(order, orderlineData.price_at_order);
    await this.updateStock(productId, shopId, orderLine.quantity);
    return true;
  }
  async newOrderByFirstProduct(
    productId: number,
    shopId: number,
    userId: number,
  ) {
    const shop = await this.shopRepository.findOne({ where: { id: shopId } });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const inventory = await this.inventoryRepository.findOne({
      where: { product: product, shop: shop },
    });
    if (inventory.quantity < 1) {
      throw new Error('Out of stock');
    }

    const createOrderDto = {
      total_price: 0,
      creation_date: new Date(),
      is_paid: false,
      userId: userId,
    };
    this.orderRepository.create(createOrderDto);
    const order = await this.orderRepository.save(createOrderDto);

    const price = inventory.price;
    const orderlineData = {
      productId: product.id,
      orderId: order.id,
      price_at_order: price,
      quantity: 1,
    };
    const orderLine = this.orderlineRepository.create(orderlineData);
    await this.orderlineRepository.save(orderLine);
    await this.updateOrderTotalPrice(order, orderlineData.price_at_order);
    await this.updateStock(productId, shopId, orderLine.quantity);
    return true;
  }
  async updateQuantityOrderline(
    order: Order,
    orderline: Orderline,
    productId: number,
    shopId: number,
    quantity: number,
  ) {
    orderline.quantity += quantity;
    if (orderline.quantity < 1) {
      await this.orderlineRepository.delete(orderline.id);
    }
    await this.orderlineRepository.save(orderline);
    await this.updateOrderTotalPrice(order, quantity);
    await this.updateStock(productId, shopId, quantity);
  }

  async updateStock(productId: number, shopId: number, quantity) {
    const shop = await this.shopRepository.findOne({ where: { id: shopId } });
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const inventory = await this.inventoryRepository.findOne({
      where: { product: product, shop: shop },
    });
    inventory.quantity = inventory.quantity + quantity;
    await this.inventoryRepository.save(inventory);
  }
  async updateOrderTotalPrice(order: Order, price: number) {
    await this.orderRepository.update(order.id, {
      total_price: order.total_price + price,
    });
  }
  async addToCart(
    productId: number,
    orderId: number,
    shopId: number,
    userId: number,
  ) {
    try {
      if (orderId) {
        // if order exists
        const order = await this.orderRepository.findOne({
          where: { id: orderId },
        });
        if (order.orderlines.length > 0) {
          for (const orderline of order.orderlines) {
            if (orderline.product.id === productId) {
              this.updateQuantityOrderline(
                order,
                orderline,
                productId,
                shopId,
                1,
              );
              return true;
            } else {
              await this.newOrdelineByNewProduct(productId, orderId, shopId);
            }
          }
          return true;
        }
      } else {
        await this.newOrderByFirstProduct(productId, shopId, userId);
      }
    } catch (error) {
      throw error;
    }
    return true;
  }

  async removeFromCart(productId: number, orderId: number, shopId: number) {
    try {
      if (orderId) {
        // if order exists
        const order = await this.orderRepository.findOne({
          where: { id: orderId },
        });
        if (order.orderlines.length > 0) {
          const orderline = await this.orderlineRepository.findOne({
            where: { id: orderId },
          });
          this.updateQuantityOrderline(order, orderline, productId, shopId, -1);
          return true;
        }
      } else {
        throw new Error('No order cant remove from cart');
      }
    } catch (error) {
      throw error;
    }
    return true;
  }
}
