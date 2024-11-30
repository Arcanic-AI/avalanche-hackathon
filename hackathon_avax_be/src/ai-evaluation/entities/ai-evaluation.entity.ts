import { CommonEntity } from 'src/commons/entities/common.entity';
import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('AiEvaluations')
export class AiEvaluation extends CommonEntity {
  @Column('json')
  data: any
}
