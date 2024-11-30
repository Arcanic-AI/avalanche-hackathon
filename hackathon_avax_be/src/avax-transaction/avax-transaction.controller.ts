import { Controller, Get, Post, Query } from "@nestjs/common";
import { AvaxTransactionService } from "./avax-transaction.service";

@Controller('transaction')
export class AvaxTransactionController {
  constructor(
    private readonly avaxTransactionService: AvaxTransactionService,
  ) {}

  @Post('auto_transaction')
  async verifySignature() {
    const run = await this.avaxTransactionService.decide()
    return run
  }

  @Post('save_ai_response')
  async save() {
    const run = await this.avaxTransactionService.save_respoonse()
    return run
  }

  @Get('history')
  async history(
    @Query('address') address : string 
  ){
    return await this.avaxTransactionService.getHistory(address)
  }
}