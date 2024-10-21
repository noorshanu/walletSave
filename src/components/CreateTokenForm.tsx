"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deployToken, listRpcUrls } from "../utils/api";
// Assuming the API path is correct
import { useAccount } from "wagmi";

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
        try {
          const response = await listRpcUrls(address as string);
          setRpcList(response.data.rpcUrls); // Save the list of RPC URLs
        } catch (error) {
          console.error("Error fetching RPC URLs:", error);
        }
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
      // Call the deployToken API here with 8 arguments
      const response = await deployToken(
        address as string, // mainWallet and owner public key (connected wallet)
        address as string, // publicKey (connected wallet)
        privateKey, // Private key for signing
        tokenName,
        tokenSymbol,
        tokenDecimals,
        totalSupply,
        selectedRpcUrl, // RPC URL
      );

      // Update response message with the result of the API call
      if (response.data.success) {
        setResponseMessage(`Token deployed successfully! Transaction Hash: ${response.data.transactionHash}`);
      } else {
        setResponseMessage(`Token deployment failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error deploying token:", error);
      setResponseMessage("An error occurred during token deployment.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className=" bg-white shadow-md  dark:bg-[#191919] p-8 rounded-md w-full  mx-auto pb-12">
      {/* Header */}
      <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Create Token</h2>

      {/* Form */}
      <form className="space-y-6 w-full " onSubmit={handleSubmit}>
        {/* Select Network */}
        <div>
          <label className="block dark:text-white text-black-2 text-sm font-medium mb-1">Select Network (RPC)</label>
          <select
            className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
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

          <div className="mb-8 mt-4">
            <a href="/rpc-url/save-url" className="py-2 px-3 text-base bg-primary-gradient rounded-md text-white font-semibold ">
              Add Network
            </a>
          </div>
        </div>

        {/* Private Key */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
          <label className="block dark:text-white text-black-2 text-sm font-medium mb-1">* Owner Private Key</label>
          <input
            type="password"
            placeholder="Enter your private key"
            value={privateKey}
            onChange={e => setPrivateKey(e.target.value)}
            className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
            required
          />
        </div>
        <div>
          <label className="block dark:text-white text-black-2 text-sm font-medium mb-1">* TOKEN TYPE</label>
          <select className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3">
            <option value="">Select Token Type</option>
            <option value="">Standard token</option>
          </select>
        </div>
      </div>

        {/* Token Name and Symbol */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block dark:text-white text-black-2 text-sm font-medium mb-1">* TOKEN NAME</label>
            <input
              type="text"
              placeholder="Ex: Ethereum"
              value={tokenName}
              onChange={e => setTokenName(e.target.value)}
              className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
              required
            />
          </div>
          <div>
            <label className="block dark:text-white text-black-2 text-sm font-medium mb-1">* TOKEN SYMBOL</label>
            <input
              type="text"
              placeholder="Ex: ETH"
              value={tokenSymbol}
              onChange={e => setTokenSymbol(e.target.value)}
              className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
              required
            />
          </div>
        </div>

        {/* Token Decimals and Total Supply */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block dark:text-white text-black-2 text-sm font-medium mb-1">* TOKEN DECIMALS</label>
            <input
              type="number"
              value={tokenDecimals}
              onChange={e => setTokenDecimals(Number(e.target.value))}
              className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
              required
            />
          </div>
          <div>
            <label className="block dark:text-white text-black-2 text-sm font-medium mb-1">* TOTAL SUPPLY</label>
            <input
              type="text"
              placeholder="Ex: 1000000000"
              value={totalSupply}
              onChange={e => setTotalSupply(e.target.value)}
              className="w-full bg-gray-100 dark:bg-[#191919] dark:text-white text-black-2 border border-gray-600 rounded-md p-3"
              required
            />
          </div>
        </div>

        {/* Response Message */}
        {responseMessage && (
          <div className="bg-[#191919] text-green-500 p-4 rounded-md mt-4">
            <p>{responseMessage}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-8 gap-4 flex-col sm:flex-row">
          <button
            type="reset"
            className="btn-rest text-white px-6 py-3 rounded-md b hover:bg-gray-600 w-full sm:w-1/2 font-semibold"
          >
            RESET
          </button>
          <button
            type="submit"
            className={`bg-primary-gradient text-white px-6 py-3 rounded-md font-semibold hover:bg-red-500 w-full sm:w-1/2 ${
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
