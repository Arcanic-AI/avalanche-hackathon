import abi from './abi.json' assert { type: 'json' };  // Add the import assertion
import { ethers } from 'ethers';

class AvalancheContract {
    constructor(privateKey, contractAddress) {

      const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc"

      // Initialize provider
      this.provider = new ethers.JsonRpcProvider(RPC_URL, {
        chainId: 43113, // Fuji Testnet Chain ID
        name: 'Avalanche C-Chain',
      });
  
      // Initialize wallet;
      this.signer = new ethers.Wallet(privateKey, this.provider);
      // Initialize contract
      this.contract = new ethers.Contract(contractAddress, abi, this.signer);
    }
  
    // Fetch contract reserves
    async getReserves() {
      try {
        const reserves = await this.contract.getReserves();
        console.log('Contract Reserves:', reserves.toString());
        return reserves;
      } catch (error) {
        console.error('Error fetching reserves:', error);
        throw error;
      }
    }
  
    // Perform a token swap
    async swapTokens(token_address, amount) {
      try {
        const tx = await this.contract.swapTokens(token_address, amount);
        console.log('Transaction Response:', tx);
        return tx;
      } catch (error) {
        console.error('Error during token swap:', error);
        throw error;
      }
    }
  
    // Get the latest block number
    async getBlockNumber() {
      try {
        const blockNumber = await this.provider.getBlockNumber();
        console.log('Current Block Number:', blockNumber);
        return blockNumber;
      } catch (error) {
        console.error('Error fetching block number:', error);
        throw error;
      }
    }

    calculateUSDCRequired(reserve_receiver_coin, reserve_usdc, eth_to_buy) {
      const fee_multiplier = BigInt(998); // Use BigInt for the fee multiplier
      const fee_base = BigInt(1000);
  
      // Convert inputs to BigInt
      const reserve_receiver_coin_big = BigInt(reserve_receiver_coin);
      const reserve_usdc_big = BigInt(reserve_usdc);
      const eth_to_buy_big = BigInt(eth_to_buy);
  
      // Ensure there is enough ETH liquidity
      if (reserve_receiver_coin_big <= eth_to_buy_big) {
          throw new Error("Insufficient ETH liquidity");
      }
  
      // Calculate the new USDC reserve after the swap
      const newReserveUSDC = (reserve_receiver_coin_big * reserve_usdc_big) / (reserve_receiver_coin_big - eth_to_buy_big);
  
      // USDC required before accounting for fee
      const usdc_required = newReserveUSDC - reserve_usdc_big;
  
      // Adjust USDC required for swap fee
      const usdc_with_fee = (usdc_required * fee_base) / fee_multiplier;
  
      return usdc_with_fee; // Return BigInt
    }
}
  
export default AvalancheContract  