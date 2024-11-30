import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { ethers, Wallet } from 'ethers';

import AvalancheContract from './avalanche/contract.js';
import TokenContract from './avalanche/token-contract.js';
import { getCoinAndPoolAddresses } from './avalanche/utils.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5628;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

app.post('/sell', async (req, res) => {
    const { token_symbol,amount,private_key } = req.body; 

    const wei_amount = ethers.parseUnits(amount.toString(), 18)
    const data = getCoinAndPoolAddresses(token_symbol.toUpperCase())

    const avalanche_contract = new AvalancheContract(private_key, data.pool_address)
    const tx = await avalanche_contract.swapTokens(data.coin_address, wei_amount)

    res.json({"data":tx});
});

app.post('/buy',async (req, res) => {
    const { token_symbol,amount,private_key } = req.body; 

    const wei_amount = ethers.parseUnits(amount.toString(), 18)
    const data = getCoinAndPoolAddresses(token_symbol.toUpperCase())

    const avalanche_contract = new AvalancheContract(private_key, data.pool_address)

    const reserves = await avalanche_contract.getReserves()

    const usdc_with_fee = avalanche_contract.calculateUSDCRequired(reserves[0], reserves[1], wei_amount)

    const tx = await avalanche_contract.swapTokens(data.usdc_address, usdc_with_fee)

    res.json({"data":tx});
});


app.post('/approve',async (req, res) => {
    const {token_symbol,private_key} = req.body;
    if(!token_symbol || !private_key){
        return res.status(400).json({error:"Missing required parameters"});
    }

    const {coin_address, pool_address,usdc_address} = getCoinAndPoolAddresses(token_symbol)

    const target_token_contract = new TokenContract(private_key, coin_address)
    const usdc_token_contract = new TokenContract(private_key, usdc_address)

    const amount = 10000
    const wei_amount = ethers.parseUnits(amount.toString(), 18)

    const target_token_tx = await target_token_contract.approveToken(pool_address, wei_amount)

    const usdc_tx = await usdc_token_contract.approveToken(pool_address, wei_amount)
    
    console.log(target_token_tx)
    console.log(usdc_tx)

    res.json({data:"Approved"});
})

app.get('/', (req, res) => {
    res.json({message:'Welcome to the Simple Express API <3'});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
