import { AvaxTransactionModule } from './../avax-transaction/avax-transaction.module';
import { Module } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [ScheduleModule.forRoot(), AvaxTransactionModule],
  providers: [CronJobService],
  exports: [CronJobService],
})
export class CronModule {}



