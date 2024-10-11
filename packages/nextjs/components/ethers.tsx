import { ethers } from "ethers";

// A simple ERC-20 token ABI for deploying tokens
const ERC20_ABI = [
  // Constructor ABI
  "constructor(string name, string symbol, uint8 decimals, uint256 totalSupply)",
];

// Update the deployToken function
export const deployToken = async (
  owner: string,
  publicKey: string,
  tokenName: string,
  tokenSymbol: string,
  tokenDecimals: number,
  totalSupply: string,
  rpcUrl: string
) => {
  try {
    // Connect to the RPC URL using ethers
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    // Use the private key to sign the deployment transaction
    const wallet = new ethers.Wallet(owner, provider);

    // Define the token factory contract using the ABI
    const tokenFactory = new ethers.ContractFactory(ERC20_ABI, /*Bytecode*/, wallet);

    // Deploy the contract
    const totalSupplyInWei = ethers.utils.parseUnits(totalSupply, tokenDecimals);
    const tokenContract = await tokenFactory.deploy(tokenName, tokenSymbol, tokenDecimals, totalSupplyInWei);

    // Wait for the transaction to be mined
    await tokenContract.deployed();

    // Return the transaction hash
    return {
      success: true,
      transactionHash: tokenContract.deployTransaction.hash,
    };
  } catch (error) {
    console.error("Error deploying token:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
