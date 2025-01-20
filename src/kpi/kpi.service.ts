import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Kpi } from './entities/kpi.entity';
import { DateRangeDto } from './dto/dateRange';

@Injectable()
export class KpiService {
  constructor(
    @InjectRepository(Kpi) private readonly kpiRepository: Repository<Kpi>,
  ) {}
  findAll() {
    return this.kpiRepository.find();
  }
  findByDate(date: Date) {
    return this.kpiRepository.find({ where: { date } });
  }

  findByRange(dateRangeDto: DateRangeDto) {
    //if no start date is provided, return all kpis
    if (!dateRangeDto.startDate) {
      return this.kpiRepository.find();
    }
    //if no end date is provided, return all from start date to now
    if (!dateRangeDto.endDate) {
      dateRangeDto.endDate = new Date().toISOString();
    }
    //check bad inputs
    if (dateRangeDto.startDate > dateRangeDto.endDate) {
      throw new Error('Start date must be before end date');
    }

    console.log('DATE RANGE DTO', dateRangeDto);
    const startDate = new Date(dateRangeDto.startDate);
    const endDate = new Date(dateRangeDto.endDate);
    return this.kpiRepository.find({
      where: { date: Between(startDate, endDate) },
    });
  }
}
