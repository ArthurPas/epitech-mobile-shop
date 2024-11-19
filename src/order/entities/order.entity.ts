import { BillingDetail } from 'src/billing-details/entities/billing-detail.entity';
import { Orderline } from 'src/orderline/entities/orderline.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  total_price: number;

  @Column()
  creation_date: Date;

  @Column()
  payment_date: Date;

  @Column()
  is_paid: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => BillingDetail)
  @JoinColumn({ name: 'billing_id' })
  billing: BillingDetail;

  @OneToMany(() => Orderline, (orderline) => orderline.order)
  orderlines: Orderline[];
}
