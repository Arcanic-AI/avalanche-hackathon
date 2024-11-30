import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Console } from 'console';
import { AvaxTransactionService } from 'src/avax-transaction/avax-transaction.service';

@Injectable()
export class CronJobService {
    constructor(
        private avaxTransactionService: AvaxTransactionService
    ) { }

    @Cron('0 */30 * * *')
    handleEvery40MinuteJob() {
        this.avaxTransactionService.save_respoonse();
    }
    @Cron('0 */8 * * *')
    handleEvery8HoursJob() {
        this.avaxTransactionService.decide();
    }
}
