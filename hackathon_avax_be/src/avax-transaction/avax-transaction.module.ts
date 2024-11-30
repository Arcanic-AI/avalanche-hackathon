import { Module, forwardRef } from '@nestjs/common';
import { AvaxTransactionService } from './avax-transaction.service';
import { CrawlerService } from 'src/crawler/crawler.service';
import { AvaxTransactionController } from './avax-transaction.controller';
import { WalletModule } from 'src/auth/wallet.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction_history } from './entities/history.entity';
import { AiEvaluationModule } from 'src/ai-evaluation/ai-evaluation.module';
import { Predictions } from './entities/predictions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction_history, Predictions]),forwardRef(() => WalletModule), EncryptionModule, AiEvaluationModule],
  providers: [AvaxTransactionService, CrawlerService], 
  exports: [AvaxTransactionService], 
  controllers: [AvaxTransactionController],
})
export class AvaxTransactionModule {}