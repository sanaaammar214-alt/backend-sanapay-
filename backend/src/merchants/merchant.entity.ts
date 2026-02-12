import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('merchants')
export class Merchant {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  businessName: string;

  @Column({ nullable: true })
  businessAddress: string;

  @Column({ default: 'PENDING' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
