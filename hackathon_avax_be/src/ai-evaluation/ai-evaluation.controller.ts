import { AiEvaluationService } from './ai-evaluation.service';
import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiResponse } from 'src/commons/api-response';
import { CrawlerService } from 'src/crawler/crawler.service';

@Controller('ai-evaluation')
export class AiEvaluationController {
  constructor(
    private readonly aiEvaluationService: AiEvaluationService,
    private readonly crawlerService: CrawlerService
) {}
  
  @Get('')
  async getAiEvaluation(
    @Query('limit') limit: number = 1
  ) {
      const ai_evaluations = await this.aiEvaluationService.findAll({limit});
      return ApiResponse.success("Get AI summary successfully",ai_evaluations);
  }

  @Post('')
  async SaveAiSummary() {
      const res = await this.crawlerService.getAiSummary();
      const data = res.data
        
      const ai_evaluation = await  this.aiEvaluationService.create({
        data
      })  
      return ApiResponse.success("Get and save AI summary successfully",ai_evaluation);
  }
}
