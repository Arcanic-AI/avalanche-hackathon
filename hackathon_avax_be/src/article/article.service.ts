import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>,
    ) { }
    async fetchAndSaveArticles(): Promise<void> {
        try {
            const response = await axios.get('http://43.207.2.31:8889/crypto-news?search=coin_desk');
            const articles = response.data.articles;
              for (const articleData of articles) {
                const article = this.articleRepository.create({
                  title: articleData.title,
                  content: articleData.content,
                  url: articleData.url,
                });
                await this.articleRepository.save(article);
              }
        } catch (error) {
            throw new NotFoundException('Error fetching and saving articles:', error);
        }
    }

    async getLatestArticles({limit}:{limit: number}): Promise<Article[]> {
      const articles = await this.articleRepository.find({
        order: {
          created_at: 'DESC',
        },
        take: limit,
      })

      return articles;
    }

}
