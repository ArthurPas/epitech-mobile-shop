import { Injectable } from '@nestjs/common';
import { CreateBillingDetailDto } from './dto/create-billing-detail.dto';
import { UpdateBillingDetailDto } from './dto/update-billing-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingDetail } from 'src/billing-details/entities/billing-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillingDetailsService {
  constructor(
    @InjectRepository(BillingDetail)
    private readonly billingDetailRepository: Repository<BillingDetail>,
  ) {}

  async create(createBillingDetailDto: CreateBillingDetailDto) {
    const billingDetail = this.billingDetailRepository.create(
      createBillingDetailDto,
    );
    return this.billingDetailRepository.save(billingDetail);
  }

  async findAll() {
    return this.billingDetailRepository.find();
  }

  async findOne(id: number) {
    return this.billingDetailRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateBillingDetailDto: UpdateBillingDetailDto) {
    await this.billingDetailRepository.update(id, updateBillingDetailDto);
    return this.billingDetailRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.billingDetailRepository.delete(id);
  }
}
