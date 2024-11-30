import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiEvaluation } from './entities/ai-evaluation.entity';

@Injectable()
export class AiEvaluationService {
    constructor(
        @InjectRepository(AiEvaluation)
        private readonly aiEvaluationRepository: Repository<AiEvaluation>,
    ) {}

    async findAll({ limit }: { limit?: number } = { limit: 1 }): Promise<AiEvaluation[]> {
        const ai_evaluations = await this.aiEvaluationRepository.find({
            order: {
                created_at: 'DESC',
            },
            take: limit,
        });
        return ai_evaluations
    }

    async create(data: Partial<AiEvaluation>) {
        const new_ai_evaluation = this.aiEvaluationRepository.create(data);
        const save_ai_evaluation = await this.aiEvaluationRepository.save(new_ai_evaluation);
        return save_ai_evaluation;
    }


}
