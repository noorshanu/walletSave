"use client";

import { useCallback, useEffect, useState } from "react";

import {  deployToken, listRpcUrls, listWallets } from "../utils/api";
// Assuming the API path is correct
import { useAccount } from "wagmi";
import SnipeToken from "./SnipeToken";
import Popup from './Popup/Popup';
import AddRpc from './Popup/AddRpc';
import RpcToast from "./RpcToast";
interface UserWallet {
  walletAddress: string;
  balance: string;
}
const CreateTokenForm = () => {
  const { address, isConnected } = useAccount(); // Get the connected wallet address
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [totalSupply, setTotalSupply] = useState("");
  const [rpcList, setRpcList] = useState<{ name: string; rpcUrl: string }[]>([]); // List of saved RPC URLs
  const [selectedRpcUrl, setSelectedRpcUrl] = useState(""); // Selected RPC URL
  const [wallets, setWallets] = useState<UserWallet[]>([]); // Use UserWallet type for correct data structure
  const [selectedWallet, setSelectedWallet] = useState(''); // Selected wallet
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // Response for debugging
  const [privateKey, setPrivateKey] = useState(""); // For demonstration, you should handle private key securely
  const [error, setError] = useState<string | null>(null);
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
    const fetchWallets = async () => {
      if (!isConnected || !address) {
        setError('Please connect your wallet.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await listWallets(address, 1, 10); // Fetch wallets from the first page
        const { walletDetails } = response.data;

        const walletsArray = Array.isArray(walletDetails) ? walletDetails : [];
        setWallets(walletsArray); // Set fetched wallets
      } catch (err) {
        console.error('Error fetching wallets:', err);
        setError('Failed to fetch wallets.');
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
    fetchRpcUrls();
  }, [isConnected, address]);
  
  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-6)}`;
  };
 
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

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleListRpcUrls = useCallback(async () => {
    if (!isConnected || !address) {
      RpcToast("Please connect your wallet", "error");
      return;
    }
    try {
      setLoading(true);
      const res = await listRpcUrls(address as string);
      const urls = res.data.rpcUrls.map((item: any) => ({
        name: item.name,
        rpcUrl: item.rpcUrl,
      }));
      setRpcList(urls);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [address, isConnected]);




  useEffect(() => {
    handleListRpcUrls(); // Fetch on component mount
  }, [handleListRpcUrls]);
  return (
   <>
   <div className=" flex  gap-2 flex-col sm:flex-row overflow-hidden">
   <div className=" bg-white shadow-md  dark:bg-[#191919] p-8 rounded-md w-full  mx-auto pb-12">
      {/* Header */}
      <h2 className="text-3xl font-bold text-black dark:text-white mb-6">Create Token</h2>
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div>Loading wallets...</div>}
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
            <button onClick={togglePopup} className="py-2 px-3 text-base bg-primary-gradient rounded-md text-white font-semibold ">
              Add Network
            </button>
          </div>
        </div>

        {/* Private Key */}
        <div className="grid grid-cols-1  gap-6">
      <div>
          <label className="block dark:text-white text-black-2 text-sm font-medium mb-1">* Owner Address</label>
          <select
          className="w-full mt-1 p-3 bg-gray-100 dark:bg-[#191919] text-black-2 dark:text-white border border-gray-700 rounded-md"
          value={selectedWallet}
          onChange={(e) => setSelectedWallet(e.target.value)}
        >
          <option value="">Select Wallet</option>
          {wallets.map((wallet) => (
            <option key={wallet.walletAddress} value={wallet.walletAddress}>
              {formatAddress(wallet.walletAddress)} ({wallet.balance})
            </option>
          ))}
        </select>
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
        <div className="grid grid-cols-1  gap-6">
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
        <div className="grid grid-cols-1  gap-6">
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
        <div className="flex justify-center mt-8 gap-4 flex-col w-full ">
          <button
            type="reset"
            className="btn-rest text-white px-6 py-3 rounded-md b hover:bg-gray-600 w-full  font-semibold"
          >
            RESET
          </button>
          <button
            type="submit"
            className={`bg-primary-gradient text-white px-6 py-3 rounded-md font-semibold hover:bg-red-500 w-full  ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create New Token"}
          </button>
        </div>
      </form>
    </div>

    <div className=" w-full  ">
      <SnipeToken/>
    </div>

   </div>
   <Popup visible={isPopupVisible} onClose={togglePopup} >
   <AddRpc  />
      </Popup>
   </>
  );
};

export default CreateTokenForm;
