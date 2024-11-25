import { BillingDetail } from 'src/billing-details/entities/billing-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  first_name: string;

  @Column({ type: 'varchar', length: 20 })
  last_name: string;

  @Column({ type: 'varchar', length: 20 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @ManyToOne(() => BillingDetail, (billing) => billing.user)
  @JoinColumn({ name: 'billing_id' })
  billing: BillingDetail;
}
