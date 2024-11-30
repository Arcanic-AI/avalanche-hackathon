import { AvaxTransactionModule } from './../avax-transaction/avax-transaction.module';
import { forwardRef, Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { EncryptionModule } from 'src/encryption/encryption.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    EncryptionModule,
    forwardRef(() => AvaxTransactionModule),
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}



