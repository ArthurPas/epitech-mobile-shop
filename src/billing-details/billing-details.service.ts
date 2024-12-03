import { Injectable } from '@nestjs/common';
import { CreateBillingDetailDto } from './dto/create-billing-detail.dto';
import { UpdateBillingDetailDto } from './dto/update-billing-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingDetail } from './entities/billing-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillingDetailsService {
  constructor(
    @InjectRepository(BillingDetail)
    private readonly billingDetailsRepository: Repository<BillingDetail>,
  ) {}

  create(createBillingDetailDto: CreateBillingDetailDto) {
    return 'This action adds a new billingDetail';
  }

  findAll() {
    return this.billingDetailsRepository.find();
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
