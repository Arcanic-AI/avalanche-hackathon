import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { AvaxTransactionService } from './../avax-transaction/avax-transaction.service';
import { WalletService } from './wallet.service';

import { ApiResponse } from 'src/commons/api-response';
import { TransactionDto } from 'src/avax-transaction/dto/transaction.dto';
import { E_COIN_SYMBOLS } from 'src/avax-transaction/helper';
import { EncryptionService } from 'src/encryption/encryption.service';
import { get } from 'http';

@Controller('auth')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly avaxTransactionService: AvaxTransactionService,
    private readonly encryptionService: EncryptionService
  ) { }

  @Post('verify')
  async verifySignature(@Body() body: any) {
    const { privateKey, expectedAddress } = body;

    const result = await this.walletService.verifySignature(privateKey, expectedAddress);
    return result;
  }

  // @Post('private-key')
  // async savePrivateKey(@Body() body: {
  //   private_key: string,
  //   address: string
  // }) {
  //   const { private_key, address } = body;

  //   const wallet = await this.walletService.savePrivateKey(private_key, address);
  //   return ApiResponse.success("Save private key successfully", wallet);
  // }

  @Get()
  async findOne(
    @Query('address') address: string
  ) {
    const wallet = await this.walletService.findOne(address);
    return ApiResponse.success("Get wallet successfully", wallet);
  }

  @Get('all')
  async findAll() {
    const wallets = await this.walletService.findAll();
    return ApiResponse.success('Get all wallets successfully', wallets);
  }

  @Post('contract')
  async contract(
    @Body() body: {
      amount: number
      token_symbol: E_COIN_SYMBOLS
      address: string
      transaction_type: string
    }
  ) {
    const { amount, token_symbol, address, transaction_type } = body

    const wallet = await this.walletService.findOne(address);

    if (wallet.private_key == null) {
      return ApiResponse.error("Private key not found")
    }

    const decrypt_private_key = this.encryptionService.decrypt(wallet.private_key);

    const transactionDto = {
      token_symbol,
      amount,
      private_key: null
    } as TransactionDto;

    transactionDto.private_key = decrypt_private_key


    const isSellTransaction = transaction_type === "SELL";
    const tx_res = await (isSellTransaction
      ? this.avaxTransactionService.sell(transactionDto)
      : this.avaxTransactionService.buy(transactionDto));

    const action = isSellTransaction ? "Sell" : "Buy";

    return ApiResponse.success(`${action} successfully`);
    // , tx_res.data
  }

}
