import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kpi } from './entities/kpi.entity';
import { KpiController } from './kpi.controller';
import { KpiService } from './kpi.service';
import { Product } from 'src/product/entities/product.entity';
import { KpiProduct } from './entities/kpiProducts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kpi, Product, KpiProduct])],
  controllers: [KpiController],
  providers: [KpiService],
})
export class KpiModule {}
