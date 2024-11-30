import { CommonEntity } from 'src/commons/entities/common.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('predictions')
export class Predictions extends CommonEntity {

  @Column()
  coin: string; 

  @Column()
  symbol: string; 

  @Column()
  signal: string;

  @Column()
  signal_strength: string;

  @Column()
  prediction: string;

  @Column()
  confidence_level: number; 
  @Column('json')
  market_trend: {
    "24h_change": string;
  };
  @Column('text')
  ai_decision_reasoning: string;
}
