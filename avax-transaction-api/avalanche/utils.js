export const ETH_ADDRESS = "0xb7b10e2c02e03e351c19c1d98399b7fc529e3aaa";
export const BTC_ADDRESS = "0xe434AC6A9d2b880f0e53eC92af9CEa839746386A"
export const DOGE_ADDRESS = "0x7dcd07efe8258e3f590577c3b1a693d9485a6368"
export const USDC_ADDRESS = "0x559bcb0ab34870b461cf533782505d9c85a0bc27"

export const BTC_USDC_POOL_ADDRESS = "0x003dF0197461Dd31751F5F47848fC728f2f2452b"
export const ETH_USDC_POOL_ADDRESS = "0xd8447ea58f5901267e32ae412a414d109ee6843a"
export const DOGE_USDC_POOL_ADDRESS = "0x216158fa368755dae4e7224158c3371fbece32f9"


export const COIN_SYMBOLS = {
    ETH: 'ETH',
    BTC: 'BTC',
    DOGE: 'DOGE',
    USDC: 'USDC'
}

export function getCoinAndPoolAddresses(coin) {
    let coin_address = "";
    let pool_address = "";

    const {ETH, BTC, DOGE, USDC} = COIN_SYMBOLS
    switch (coin.toUpperCase()) {
        case ETH:
            coin_address = ETH_ADDRESS;
            pool_address = ETH_USDC_POOL_ADDRESS;
            break;
        case BTC:
            coin_address = BTC_ADDRESS;
            pool_address = BTC_USDC_POOL_ADDRESS;
            break;
        case DOGE:
            coin_address = DOGE_ADDRESS;
            pool_address = DOGE_USDC_POOL_ADDRESS;
            break;
        case USDC:
            coin_address = USDC_ADDRESS;
            // USDC doesn't have a specific pool address (it is used in all pools)
            pool_address = "No specific pool for USDC";
            break;
        default:
            throw new Error("Invalid coin type. Supported coins: ETH, BTC, DOGE, USDC.");
    }

    return { coin_address, pool_address, usdc_address: USDC_ADDRESS };
}
