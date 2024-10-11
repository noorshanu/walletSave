"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

// Import ethers.js

// Deploy token function using ethers.js
const deployToken = async (
  owner: string,
  tokenName: string,
  tokenSymbol: string,
  tokenDecimals: number,
  totalSupply: string,
  rpcUrl: string,
) => {
  const ERC20_ABI = ["constructor(string name, string symbol, uint8 decimals, uint256 totalSupply)"];

  try {
    // Connect to the selected RPC URL using ethers.js
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    // Set up the wallet using the owner (private key should be handled securely in production)
    const wallet = new ethers.Wallet(owner, provider);

    // Token factory: ABI and bytecode for the ERC-20 token
    const tokenFactory = new ethers.ContractFactory(ERC20_ABI, wallet);

    // Convert the total supply to the correct unit (using decimals)
    const totalSupplyInWei = ethers.utils.parseUnits(totalSupply, tokenDecimals);

    // Deploy the token
    const tokenContract = await tokenFactory.deploy(tokenName, tokenSymbol, tokenDecimals, totalSupplyInWei);

    // Wait for the transaction to be mined
    await tokenContract.deployed();

    // Return success and the transaction hash
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

const CreateTokenForm = () => {
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [totalSupply, setTotalSupply] = useState("");
  const [rpcList, setRpcList] = useState<{ name: string; rpcUrl: string }[]>([]); // List of saved RPC URLs
  const [selectedRpcUrl, setSelectedRpcUrl] = useState(""); // Selected RPC URL
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // Response for debugging
  const [privateKey, setPrivateKey] = useState(""); // For demonstration, you should handle private key securely

  // Fetch the saved RPC URLs when the component mounts
  useEffect(() => {
    const fetchRpcUrls = async () => {
      if (isConnected && address) {
        // Simulate the list of RPC URLs (can replace with actual API call)
        setRpcList([
          {
            name: "Binance Smart Chain Testnet",
            rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
          },
        ]);
      }
    };

    fetchRpcUrls();
  }, [isConnected, address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRpcUrl) {
      alert("Please select an RPC URL.");
      return;
    }

    if (!privateKey) {
      alert("Please enter the private key.");
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Call the deployToken API
      const response = await deployToken(
        privateKey, // Pass private key for wallet signing
        tokenName,
        tokenSymbol,
        tokenDecimals,
        totalSupply,
        selectedRpcUrl,
      );

      // Update response message with the result of the API call
      if (response.success) {
        setResponseMessage(`Token deployed successfully! Transaction Hash: ${response.transactionHash}`);
      } else {
        setResponseMessage(`Token deployment failed: ${response.message}`);
      }
    } catch (error) {
      console.error("Error deploying token:", error);
      setResponseMessage("An error occurred during token deployment.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="bg-[#1c1d32] p-8 rounded-md w-full max-w-4xl mx-auto">
      {/* Header */}
      <h2 className="text-3xl font-bold text-white mb-6">Create Token</h2>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Select Network */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">Select Network (RPC)</label>
          <select
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md p-3"
            value={selectedRpcUrl}
            onChange={e => setSelectedRpcUrl(e.target.value)}
            required
          >
            <option value="">Select an RPC URL</option>
            {rpcList.map(rpc => (
              <option key={rpc.rpcUrl} value={rpc.rpcUrl}>
                {rpc.name} - {rpc.rpcUrl}
              </option>
            ))}
          </select>

          <div className="mt-4">
            <a href="/rpc-url/save-url">
              <a className="py-1 px-3 text-base bg-primary-gradient rounded-full text-white">Add Network</a>
            </a>
          </div>
        </div>

        {/* Private Key */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-1">* Owner Private Key</label>
          <input
            type="password"
            placeholder="Enter your private key"
            value={privateKey}
            onChange={e => setPrivateKey(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-600 rounded-md p-3"
            required
          />
        </div>

        {/* Token Name and Symbol */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">* TOKEN NAME</label>
            <input
              type="text"
              placeholder="Ex: Ethereum"
              value={tokenName}
              onChange={e => setTokenName(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-md p-3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">* TOKEN SYMBOL</label>
            <input
              type="text"
              placeholder="Ex: ETH"
              value={tokenSymbol}
              onChange={e => setTokenSymbol(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-md p-3"
              required
            />
          </div>
        </div>

        {/* Token Decimals and Total Supply */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">* TOKEN DECIMALS</label>
            <input
              type="number"
              value={tokenDecimals}
              onChange={e => setTokenDecimals(Number(e.target.value))}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-md p-3"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">* TOTAL SUPPLY</label>
            <input
              type="text"
              placeholder="Ex: 1000000000"
              value={totalSupply}
              onChange={e => setTotalSupply(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-md p-3"
              required
            />
          </div>
        </div>

        {/* Response Message */}
        {responseMessage && (
          <div className="bg-gray-800 text-green-500 p-4 rounded-md mt-4">
            <p>{responseMessage}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="reset"
            className="bg-gray-700 text-white px-6 py-3 rounded-full border border-gray-500 hover:bg-gray-600"
          >
            RESET
          </button>
          <button
            type="submit"
            className={`bg-primary-gradient text-white px-6 py-3 rounded-full hover:bg-red-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create New Token"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTokenForm;
