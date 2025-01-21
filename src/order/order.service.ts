import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order | undefined> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order | undefined> {
    await this.orderRepository.update(id, updateOrderDto);
    return this.orderRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async getAverageTimeSpentBeforePay(date: Date): Promise<number> {
    const orders = await this.orderRepository.find({
      where: { creation_date: date, is_paid: true },
      relations: ['orderlines'],
    });

    if (orders.length === 0) {
      return 0;
    }
    const total = orders.reduce((acc, order) => {
      const timeSpent =
        order.creation_date.getTime() - order.payment_date.getTime();
      return acc + timeSpent;
    }, 0);

    return total / orders.length;
  }
}
