import { Product } from 'src/product/entities/product.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Kpi } from './kpi.entity';

@Entity()
export class KpiProduct {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Kpi, {
    onDelete: 'CASCADE',
  })
  kpi: Kpi;
  @ManyToOne(() => Product, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
