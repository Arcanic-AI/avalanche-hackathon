import { CommonEntity } from 'src/commons/entities/common.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Articles')
export class Article extends CommonEntity {

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ length: 255 })
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
