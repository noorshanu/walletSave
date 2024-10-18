import React from "react";
import { FaEthereum, FaBitcoin, FaBtc } from "react-icons/fa";

// Example icons from react-icons

const BlockchainGrid: React.FC = () => {
  const createTokenData = [
    {
      name: "ETH (ERC20)",
      icon: <img src="eth.png" alt=""   />,
    },
    {
      name: "BSC (BEP20)",
      icon: <img src="bsc.png" alt=""   />,
    },
    { name: "Solana", icon: <img src="sol.png" alt=""   /> },

    {
      name: "Tron (TRC20)",
      icon: <img src="tron.png" alt=""   />,
    },

    { name: "SUI", icon: <img src="sui.png" alt=""   /> },

    { name: "Base", icon: <img src="base.png" alt=""   /> },
  ];

  const tokenBatchSenderData = [
    {
      name: "ETH (ERC20)",
      icon: <img src="eth.png" alt=""   />,
    },
    {
      name: "BSC (BEP20)",
      icon: <img src="bsc.png" alt=""   />,
    },
    { name: "Solana", icon: <img src="sol.png" alt=""   /> },

    {
      name: "Tron (TRC20)",
      icon: <img src="tron.png" alt=""   />,
    },

    { name: "SUI", icon: <img src="sui.png" alt=""   /> },

    { name: "Base", icon: <img src="base.png" alt=""   /> },
  ];

  const batchSwapData = [
    {
      name: "ETH (ERC20)",
      icon: <img src="eth.png" alt=""   />,
    },
    {
      name: "BSC (BEP20)",
      icon: <img src="bsc.png" alt=""   />,
    },
    { name: "Solana", icon: <img src="sol.png" alt=""   /> },

    {
      name: "Tron (TRC20)",
      icon: <img src="tron.png" alt=""   />,
    },
    { name: "SUI", icon: <img src="sui.png" alt=""   /> },

    { name: "Base", icon: <img src="base.png" alt=""   /> },
  ];

  return (
    <div className="w-full px-2">
      <div className="flex w-full   flex-col justify-between gap-6 sm:flex-row ">
        {/* Create Token Section */}
        <div className="w-full rounded-lg bg-white p-4 shadow-md dark:bg-[#191919]  ">
          <h2 className="mb-4 text-lg font-semibold text-black-2 dark:text-white">Create Token</h2>
          <div className="grid grid-cols-2 gap-4">
            {createTokenData.map((item, idx) => (
              <button
                key={idx}
                className="flex items-center rounded-md border p-2 hover:border-[#40df9e] border-[#4C4C4C]  hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.icon}
                <span className="ml-2 ">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Token Batch Sender Section */}
        <div className="w-full rounded-lg bg-white p-4 shadow-md dark:bg-[#191919] ">
          <h2 className="mb-4 text-lg font-semibold text-black-2 dark:text-white">
            Launch and Bundle Sender
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {tokenBatchSenderData.map((item, idx) => (
              <button
                key={idx}
                className="flex items-center rounded-md border p-2 hover:border-[#40df9e] border-[#4C4C4C]  hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Market Maker - Batch Swap Section */}
        <div className="w-full rounded-lg bg-white p-4 shadow-md dark:bg-[#191919]  ">
          <h2 className="mb-4 text-lg font-semibold text-black-2 dark:text-white">Market Maker - Volume</h2>
          <div className="grid grid-cols-2 gap-4">
            {batchSwapData.map((item, idx) => (
              <button
                key={idx}
                className="flex items-center rounded-md border p-2 hover:border-[#40df9e] border-[#4C4C4C]  hover:bg-gray-100 dark:hover:bg-gray-700"
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
