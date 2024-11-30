import { CommonEntity } from 'src/commons/entities/common.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('transaction_history')
export class Transaction_history extends CommonEntity {

  @Column({ length: 255 })
  address: string;

  @Column()
  amount: number;

  @Column()
  token_symbol: string;

  @Column()
  type: string;

  @Column()
  status: string;
}
