/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { listWallets, getBalance } from "../utils/api";
import { useAccount } from "wagmi";
import Popup from "./Popup/Popup";
import GenerateWallets from "./Popup/GenerateWallets";
import BuySetting from "./Popup/BuySetting";
import SellSetting from "./Popup/SellSetting ";
import { FaEthereum } from "react-icons/fa";

interface Wallet {
  walletAddress: string;
  balance: string;
}

const SniperToken = () => {
  const { address, isConnected } = useAccount();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalWallets, setTotalWallets] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('Select Pair');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const options = [
    { name: 'ETH', icon: '/eth.png' },
    { name: 'BSC', icon: '/bsc.png' },
    // Add more options as needed
  ];
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  const walletsPerPage = 10;

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-6)}`;
  };

  // Load wallets from localStorage on component mount
  useEffect(() => {
    const savedWallets = localStorage.getItem("wallets");
    const savedTotalWallets = localStorage.getItem("totalWallets");
    const savedPage = localStorage.getItem("currentPage");

    if (savedWallets) {
      setWallets(JSON.parse(savedWallets));
    }

    if (savedTotalWallets) {
      setTotalWallets(Number(savedTotalWallets));
    }

    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  const fetchWallets = async (page: number) => {
    if (!isConnected || !address) {
      setError("Please connect your wallet.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await listWallets(address, page, walletsPerPage);
      const { walletDetails, total } = response.data;

      const walletsArray = Array.isArray(walletDetails) ? walletDetails : [];

      // Check if rpcUrl is defined for the owner before making the balance call
      const rpcUrl = "<RPC_URL>"; // Replace with the correct rpcUrl
      if (!rpcUrl) {
        setError("RPC URL is missing for the owner.");
        return;
      }

      const updatedWallets = await Promise.all(
        walletsArray.map(async (wallet: Wallet) => {
          try {
            const balanceResponse = await getBalance(
              rpcUrl,
              address,
              wallet.walletAddress,
            );
            const balance = balanceResponse.data.balance;
            return {
              ...wallet,
              balance: balance || "0.00",
            };
          } catch (balanceError) {
            console.error(
              "Error fetching balance for wallet:",
              wallet.walletAddress,
              balanceError,
            );
            return { ...wallet, balance: "0.00" };
          }
        }),
      );

      setWallets(updatedWallets);
      setTotalWallets(typeof total === "number" ? total : 0);
    } catch (err) {
      console.error("Error fetching wallets:", err);
      setError("Failed to fetch wallets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets(currentPage);
  }, [currentPage, isConnected]);

  const totalPages = Math.ceil(totalWallets / walletsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchWallets(newPage);
    }
  };
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible2, setIsPopupVisible2] = useState(false);
  const [isPopupVisible3, setIsPopupVisible3] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const togglePopup2 = () => {
    setIsPopupVisible2(!isPopupVisible2);
  };
  const togglePopup3 = () => {
    setIsPopupVisible3(!isPopupVisible3);
  };
  return (
    <div className=" ">
      <div className="flex flex-col gap-4  sm:flex-row">
        <div className="  w-full rounded-lg bg-white p-4 text-white shadow-lg dark:bg-[#191919] sm:w-1/2">
          <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
            Add liquidity
          </h2>
          <div>
            <div className="my-6 flex flex-col  gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Token Address
                </label>
                <select className="mt-1 block w-full rounded-md border border-gray-700 bg-white px-3 py-2 text-sm dark:bg-[#191919]">
                  <option value="">NOT SET</option>

                  <option>Token addresss</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="  ">
            <div className=" flex w-full items-center gap-4">
              <div className=" w-full">
                <label className="text-sm font-medium">Add Token %</label>
                <input
                  type="number"
                  placeholder="%"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-white px-3 py-2 text-sm dark:bg-[#191919]"
                />
              </div>
              <span className=" w-full text-sm text-black dark:text-white mt-6">
                Balance: 1.00{" "}
              </span>
            </div>

            <div className="mt-4 rounded-md w-10  bg-green-600 px-2 py-1 text-sm font-semibold text-white">
              Eth
            </div>
          </div>
       
            <div className="relative inline-block w-full mt-4">
      <button
        onClick={toggleDropdown}
        className="w-full bg-gray-100 dark:bg-[#191919] text-black-2 dark:text-white border border-gray-600 rounded-md p-3 flex justify-between items-center"
      >
        {selectedOption}
        <span>&#9660;</span> {/* Dropdown arrow */}
      </button>
      {isDropdownOpen && (
        <ul className="absolute w-full bg-white dark:bg-[#191919] border border-gray-300 mt-2 rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="flex items-center p-3 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => handleOptionClick(option.name)}
            >
              <img src={option.icon} alt={option.name} className="w-6 h-6 mr-2" />
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
        </div>
        <div className="rounded-lg bg-white p-4 text-white shadow-lg dark:bg-[#191919]">
          <header className="flex items-center justify-between pb-4">
            <h1 className="text-xl font-bold">Sniper</h1>
          </header>

          {/* Show error if exists */}
          {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

          {/* Show loading indicator */}
          {loading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : (
            <>
              <div className="mb-4 flex  flex-col">
                <div className="flex items-center">
                  <label className="mr-4 block text-sm font-medium">
                    Dev Wallet :{" "}
                  </label>
                  <p>9R3b2NEwdF1j8yGQQZZMUE...SCktKrn48aYZd</p>
                </div>
                <div className=" my-2 ">
                  <label
                    htmlFor=""
                    className=" mb-2  mr-4 block text-sm font-medium"
                  >
                    {" "}
                    First Buy
                  </label>
                  <input
                    type="number"
                    className="block w-full rounded-md border border-gray-700 bg-white px-3 py-2 text-sm dark:bg-[#191919]"
                    placeholder="FB amount"
                  />
                </div>
              </div>

              <div className="mb-4 flex gap-2">
                <button
                  className="bg-primary-gradient rounded-md px-4 py-2 text-sm"
                  onClick={togglePopup}
                >
                  Generate Wallets
                </button>
                <button className="bg-primary-gradient rounded-md px-4 py-2 text-sm">
                  Download Wallets
                </button>
                <button
                  className="bg-primary-gradient rounded-md px-4 py-2 text-sm"
                  onClick={togglePopup2}
                >
                  Buy Setting
                </button>
                <button
                  className="bg-primary-gradient rounded-md px-4 py-2 text-sm"
                  onClick={togglePopup3}
                >
                  Sell Setting
                </button>
              </div>

              <table className="w-full rounded-md border border-gray-300 bg-white p-4 text-left text-sm dark:bg-[#191919]">
                <thead>
                  <tr className="bg-white dark:bg-[#191919]">
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Address</th>
                    <th className="px-4 py-2">Balance</th>
                    <th className="px-4 py-2">Token Balance</th>
                    <th className="px-4 py-2">Tokens to Buy</th>
                  </tr>
                </thead>
                <tbody>
                  {wallets.map((wallet, index) => (
                    <tr key={wallet.walletAddress}>
                      <td className="flex items-center gap-2 px-4 py-2">
                        <input type="checkbox" />{" "}
                        {(currentPage - 1) * walletsPerPage + index + 1}
                      </td>
                      <td className="px-4 py-2 text-black-2 dark:text-white">
                        {formatAddress(wallet.walletAddress)}
                      </td>
                      <td className="px-4 py-2">{wallet.balance}</td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          className="rounded-md border border-gray-700 bg-white px-2 py-1 text-sm dark:bg-[#191919]"
                          value="0.00"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          className="rounded-md border border-gray-700 bg-white px-2 py-1 text-sm dark:bg-[#191919]"
                          value="0.00"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="my-4 flex gap-2">
                <button
                  className="bg-primary-gradient rounded-md px-4 py-2 text-sm"
                  onClick={togglePopup}
                >
                  Samulate
                </button>
                <button className="bg-primary-gradient rounded-md px-4 py-2 text-sm">
                  Disperse
                </button>
                <button
                  className="bg-primary-gradient rounded-md px-4 py-2 text-sm"
                  onClick={togglePopup2}
                >
                  Create
                </button>
                <button
                  className="bg-primary-gradient rounded-md px-4 py-2 text-sm"
                  onClick={togglePopup3}
                >
                  Buy
                </button>
                <button
                  className="bg-primary-gradient rounded-md px-4 py-2 text-sm"
                  onClick={togglePopup3}
                >
                  Disperse Token
                </button>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  className="btn-rest rounded px-4 py-2 text-black-2 dark:text-white"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <div className="px-4 py-2">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  className="btn-rest rounded px-4 py-2 text-black-2 dark:text-white"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
      
         
       
            </>
          )}
        </div>
      </div>

      <Popup visible={isPopupVisible} onClose={togglePopup}>
        <GenerateWallets />
      </Popup>
      <Popup visible={isPopupVisible2} onClose={togglePopup2}>
        <BuySetting />
      </Popup>
      <Popup visible={isPopupVisible3} onClose={togglePopup3}>
        <SellSetting />
      </Popup>
      <div className="flex items-center justify-center">
        <button className="bg-primary-gradient mt-4 w-full rounded-md px-4 py-2 font-semibold text-white ">
          Create Pool
        </button>
      </div>
    </div>
  );
};

export default SniperToken;
