import { Controller, Get, Body } from '@nestjs/common';
import { KpiService } from './kpi.service';
import { DateRangeDto } from './dto/dateRange';

@Controller('kpis')
export class KpiController {
  constructor(private readonly kpiService: KpiService) {}

  @Get() findAll() {
    return this.kpiService.findAll();
  }
  @Get('/range') findByRange(@Body() dateRangeDto: DateRangeDto) {
    {
      return this.kpiService.findByRange(dateRangeDto);
    }
  }
}
