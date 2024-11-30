import { E_COIN_SYMBOLS } from "../helper"

export type TransactionDto = {
    private_key:string,
    amount:number,
    token_symbol:E_COIN_SYMBOLS
}