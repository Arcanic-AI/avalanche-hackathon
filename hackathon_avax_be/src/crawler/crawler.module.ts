import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CrawlerService } from './crawler.service';
import { AiEvaluation } from '../ai-evaluation/entities/ai-evaluation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AiEvaluation])],
    providers: [CrawlerService],
    exports: [CrawlerService],
})
export class CrawlerModule { }