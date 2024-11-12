import { Injectable } from '@nestjs/common';
import { CreateBillingDetailDto } from './dto/create-billing-detail.dto';
import { UpdateBillingDetailDto } from './dto/update-billing-detail.dto';

@Injectable()
export class BillingDetailsService {
  create(createBillingDetailDto: CreateBillingDetailDto) {
    return 'This action adds a new billingDetail';
  }

  findAll() {
    return `This action returns all billingDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billingDetail`;
  }

  update(id: number, updateBillingDetailDto: UpdateBillingDetailDto) {
    return `This action updates a #${id} billingDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} billingDetail`;
  }
}
