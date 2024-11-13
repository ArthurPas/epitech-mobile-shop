import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BillingDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  zip_code: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @ManyToOne(() => User, (user) => user.billing)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
