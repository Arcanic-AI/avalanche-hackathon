import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './auth/wallet.module';
import { MySqlModule } from './database/mysql.module';
import { CatModule } from './cat/cat.module';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module';
import { CrawlerModule } from './crawler/crawler.module';
import { AiEvaluationModule } from './ai-evaluation/ai-evaluation.module';
import { EncryptionModule } from './encryption/encryption.module';
import { AvaxTransactionModule } from './avax-transaction/avax-transaction.module';
import { CronJobService } from './cron-job/cron-job.service';
import { CronModule } from './cron-job/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CatModule,
    WalletModule,
    MySqlModule,
    ArticleModule,
    CrawlerModule,
    AiEvaluationModule,
    EncryptionModule,
    AvaxTransactionModule,
    CronModule
],
  controllers: [AppController],
  providers: [AppService, CronJobService],
})
export class AppModule { }
