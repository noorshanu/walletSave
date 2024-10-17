import React from "react";
import { FaEthereum, FaBitcoin, FaBtc } from "react-icons/fa";

// Example icons from react-icons

const BlockchainGrid: React.FC = () => {
  const createTokenData = [
    {
      name: "ETH (ERC20)",
      icon: <img src="eth.png" alt="" className=" w-6 h-6" />,
    },
    {
      name: "BSC (BEP20)",
      icon: <img src="bsc.png" alt="" className=" w-6 h-6" />,
    },
    { name: "Solana", icon: <img src="sol.png" alt="" className=" w-6 h-6" /> },

    {
      name: "Tron (TRC20)",
      icon: <img src="tron.png" alt="" className=" w-6 h-6" />,
    },

    { name: "SUI", icon: <img src="sui.png" alt="" className=" w-6 h-6" /> },

    { name: "Base", icon: <img src="base.png" alt="" className=" w-6 h-6" /> },
  ];

  const tokenBatchSenderData = [
    {
      name: "ETH (ERC20)",
      icon: <img src="eth.png" alt="" className=" w-6 h-6" />,
    },
    {
      name: "BSC (BEP20)",
      icon: <img src="bsc.png" alt="" className=" w-6 h-6" />,
    },
    { name: "Solana", icon: <img src="sol.png" alt="" className=" w-6 h-6" /> },

    {
      name: "Tron (TRC20)",
      icon: <img src="tron.png" alt="" className=" w-6 h-6" />,
    },

    { name: "SUI", icon: <img src="sui.png" alt="" className=" w-6 h-6" /> },

    { name: "Base", icon: <img src="base.png" alt="" className=" w-6 h-6" /> },
  ];

  const batchSwapData = [
    {
      name: "ETH (ERC20)",
      icon: <img src="eth.png" alt="" className=" w-6 h-6" />,
    },
    {
      name: "BSC (BEP20)",
      icon: <img src="bsc.png" alt="" className=" w-6 h-6" />,
    },
    { name: "Solana", icon: <img src="sol.png" alt="" className=" w-6 h-6" /> },

    {
      name: "Tron (TRC20)",
      icon: <img src="tron.png" alt="" className=" w-6 h-6" />,
    },
    { name: "SUI", icon: <img src="sui.png" alt="" className=" w-6 h-6" /> },

    { name: "Base", icon: <img src="base.png" alt="" className=" w-6 h-6" /> },
  ];

  return (
    <div className="px-6 w-full">
      <div className="flex gap-6   justify-between flex-col sm:flex-row w-full ">
        {/* Create Token Section */}
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-[#1c1d32] w-full  ">
          <h2 className="text-lg font-semibold mb-4">Create Token</h2>
          <div className="grid grid-cols-2 gap-4">
            {createTokenData.map((item, idx) => (
              <button
                key={idx}
                className="flex items-center p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-[#40df9e]"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Token Batch Sender Section */}
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-[#1c1d32] w-full ">
          <h2 className="text-lg font-semibold mb-4">
            Launch and Bundle Sender
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {tokenBatchSenderData.map((item, idx) => (
              <button
                key={idx}
                className="flex items-center p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-[#40df9e]"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Market Maker - Batch Swap Section */}
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-[#1c1d32] w-full  ">
          <h2 className="text-lg font-semibold mb-4">Market Maker - Volume</h2>
          <div className="grid grid-cols-2 gap-4">
            {batchSwapData.map((item, idx) => (
              <button
                key={idx}
                className="flex items-center p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-[#40df9e]"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainGrid;
