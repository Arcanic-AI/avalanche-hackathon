import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AiEvaluationService } from './ai-evaluation.service';
import { AiEvaluationController } from './ai-evaluation.controller';

import { AiEvaluation } from '../ai-evaluation/entities/ai-evaluation.entity';
import { CrawlerModule } from 'src/crawler/crawler.module';

@Module({
    imports: [TypeOrmModule.forFeature([AiEvaluation]), CrawlerModule],
    providers: [AiEvaluationService],
    controllers: [AiEvaluationController],
    exports: [AiEvaluationService]
})
export class AiEvaluationModule { }