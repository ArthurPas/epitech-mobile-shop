import { Injectable } from '@nestjs/common';
import { CreateOrderlineDto } from './dto/create-orderline.dto';
import { UpdateOrderlineDto } from './dto/update-orderline.dto';

@Injectable()
export class OrderlineService {
  create(createOrderlineDto: CreateOrderlineDto) {
    return 'This action adds a new orderline';
  }

  findAll() {
    return `This action returns all orderline`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderline`;
  }

  update(id: number, updateOrderlineDto: UpdateOrderlineDto) {
    return `This action updates a #${id} orderline`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderline`;
  }
}
