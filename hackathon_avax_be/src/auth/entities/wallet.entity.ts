import { CommonEntity } from 'src/commons/entities/common.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Wallets')
export class Wallet extends CommonEntity {

  @Column({ length: 255 })
  address: string;

  @Column({ nullable: false }) 
  private_key: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
