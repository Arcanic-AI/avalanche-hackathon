import { Controller, Get, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiResponse } from 'src/commons/api-response';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  
  @Get('fetch')
  async fetchAndSaveArticles() {
    await this.articleService.fetchAndSaveArticles();
    return { message: 'Articles fetched and saved successfully' };
  }

  @Get('latest')
  async getLatestArticles(
    @Query('limit') limit: number = 10
  ) {
    const articles = await this.articleService.getLatestArticles({limit});
    return ApiResponse.success("Get latest articles successfully",articles);
  }
}
