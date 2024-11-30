import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

import { TransactionDto } from './dto/transaction.dto';
import { CrawlerService } from 'src/crawler/crawler.service';
import { WalletService } from 'src/auth/wallet.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction_history } from './entities/history.entity';
import { Repository } from 'typeorm';
import { AiEvaluationService } from 'src/ai-evaluation/ai-evaluation.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Predictions } from './entities/predictions.entity';

@Injectable()
export class AvaxTransactionService {
    private readonly baseUrl = process.env.AVAX_TRANSACTION_API_URL

    constructor(
        @InjectRepository(Transaction_history)
        private transaction_history: Repository<Transaction_history>,
        @InjectRepository(Predictions)
        private predictionRepository: Repository<Predictions>,
        private readonly crawlerService: CrawlerService,
        private readonly walletService: WalletService,
        private readonly encryptionService: EncryptionService,
        private readonly aiEvaluationService: AiEvaluationService
    ) { }

    async test() {
        const response = await axios.get(`${this.baseUrl}`);
        return response
    }
    async sell(payload: TransactionDto) {
        const response = await axios.post(`${this.baseUrl}/sell`, payload, {
            timeout: 900000,
        });
        
        return response.data;
    }

    async buy(payload: TransactionDto) {
        const response = await axios.post(`${this.baseUrl}/buy`, payload, {
            timeout: 900000,
        });

        return response.data;
    }

    async getAverageConfidenceByCoin() {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const result = await this.predictionRepository
            .createQueryBuilder('p')
            .select('p.coin')
            .addSelect('AVG(p.confidence_level)', 'avgConfidenceLevel')
            .where('p.created_at BETWEEN :start AND :end', { start: todayStart, end: todayEnd })
            .groupBy('p.coin')
            .getRawMany();

        if (!result || result.length === 0) {
            return [];
        }
        return result;
    }

    async save_respoonse() {
        const dataCrawAi = await this.crawlerService.getAiSummary();
        for (const item of dataCrawAi.data) {
            const predictionData = {
                coin: item.coin,
                symbol: item.symbol,
                signal: item.signal,
                signal_strength: item.signal_strength,
                prediction: item.prediction,
                confidence_level: item.confidence_level,
                market_trend: item.market_trend,
                ai_decision_reasoning: item.ai_decision_reasoning,
            };
            const prediction = this.predictionRepository.create(predictionData);
            await this.predictionRepository.save(prediction);
            await this.aiEvaluationService.create(dataCrawAi)
        }
    }

    async decide() {
        const wallet = await this.walletService.findAll();
        const limit = 1;
        const dataCrawAi = await this.aiEvaluationService.findAll({ limit });
        if (!dataCrawAi || !dataCrawAi[0] || !dataCrawAi[0].data || dataCrawAi[0].data.length === 0) {
            return;
        }

        const reputation = await this.getAverageConfidenceByCoin();

        const buyGroup = [];
        const sellGroup = [];

        for (const item of dataCrawAi[0].data) {
            const coinReputation = reputation.find(r => r.p_coin === item.coin);
            if (coinReputation && coinReputation.avgConfidenceLevel >= 70) {

                if (item.signal === 'positive') {
                    buyGroup.push(item);
                } else if (item.signal === 'negative') {
                    sellGroup.push(item);
                }
            }
        }

        const chunkSize = 5;
        const chunkedWallets = [];
        for (let i = 0; i < wallet.length; i += chunkSize) {
            chunkedWallets.push(wallet.slice(i, i + chunkSize));
        }

        const handleBuy = async (x: any) => {
            for (const walletChunk of chunkedWallets) {
                for (const w of walletChunk) {
                    const decrypt_private_key = this.encryptionService.decrypt(w.private_key);
                    const payload = {
                        private_key: decrypt_private_key,
                        amount: 20,
                        token_symbol: x.symbol
                    };
                    console.log("buy",x.symbol)
                    const transaction = new Transaction_history();
                    transaction.address = w.address;
                    transaction.amount = 20;
                    transaction.token_symbol = x.symbol;
                    transaction.type = "buy";

                    try {
                        await this.buy(payload);
                        transaction.status = "success";
                    } catch (error) {
                        console.error(`Transaction failed for wallet ${w.address}:`, error.message);
                        transaction.status = "failed";
                    }
                    await this.transaction_history.save(transaction);
                }
            }
        };

        const handleSell = async (x: any) => {
            for (const walletChunk of chunkedWallets) {
                for (const w of walletChunk) {
                    const decrypt_private_key = this.encryptionService.decrypt(w.private_key);
                    const payload = {
                        private_key: decrypt_private_key,
                        amount: 20,
                        token_symbol: x.symbol
                    };
                    console.log("sell",x.symbol)
                    const transaction = new Transaction_history();
                    transaction.address = w.address;
                    transaction.amount = 20;
                    transaction.token_symbol = x.symbol;
                    transaction.type = "sell";

                    try {
                        await this.sell(payload);
                        transaction.status = "success";
                    } catch (error) {
                        transaction.status = "failed";
                    }
                    await this.transaction_history.save(transaction);
                }
            }
        };

        await Promise.all([
            ...buyGroup.map(x => handleBuy(x)),
            ...sellGroup.map(x => handleSell(x))
        ]);
    }


    async getHistory(address: string) {
        const check = await this.walletService.findOne(address)
        if (!check) {
            throw new NotFoundException('cannot find ')
        }
        const history = await this.transaction_history.find({
            where: { address },
            order: { created_at: 'DESC' }
        });
        return history;
    }
}
