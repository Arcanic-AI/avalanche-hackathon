import token_abi from "./token_abi.json" assert { type: "json" }; // Add the import assertion

import { ethers } from "ethers";

class TokenContract {
	constructor(privateKey, contractAddress) {
		const RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";

		this.provider = new ethers.JsonRpcProvider(RPC_URL, {
			chainId: 43113, // Fuji Testnet Chain ID
			name: "Avalanche C-Chain",
		});

		this.signer = new ethers.Wallet(privateKey, this.provider);

		this.contract = new ethers.Contract(
			contractAddress,
			token_abi
		);
	}

	async approveToken(token_address, amount) {
		try {
            const connect_wallet_with_contract = this.contract.connect(this.signer)
            
			const response = await connect_wallet_with_contract.approve(token_address, amount);
            const tx = await response.wait();

			console.log("Transaction Response:", tx);
			return tx;
		} catch (error) {
			console.error("Error during token approval:", error);
			throw error;
		}
	}
}

export default TokenContract;
