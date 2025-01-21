import { Controller, Get, Body } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { DateRangeDto } from './dto/dateRange';
import { KpiResponse } from './dao/KpiReport';

@Controller('kpis')
export class KpiController {
  constructor(private readonly kpiService: KpiService) {}

  @Get() findAll() {
    return this.kpiService.findAll();
  }
  @Get('/range') async findByRange(
    @Body() dateRangeDto: DateRangeDto,
  ): Promise<KpiResponse[]> {
    return this.kpiService.findByRange(dateRangeDto);
  }
}
