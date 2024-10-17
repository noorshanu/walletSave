import React from 'react';
import { FaTools, FaCheckCircle, FaBalanceScale, FaWallet } from 'react-icons/fa'; // Example icons
import { IoAddCircleOutline } from "react-icons/io5";
import { LuSendToBack } from "react-icons/lu";
import { TbBinaryTree2 } from "react-icons/tb";
import { GiSellCard } from "react-icons/gi";
import { IoMdSwap } from "react-icons/io";
import { RiIncreaseDecreaseLine } from "react-icons/ri";
import { HiOutlineCollection } from "react-icons/hi";
import { GiBrainFreeze } from "react-icons/gi";
import { FaBurn } from "react-icons/fa";
// Define the type for the tool item
type ToolItem = {
  name: string;
  icon: React.ReactNode; // This type allows JSX elements like icons
  statusIcon?: React.ReactNode; // Optional statusIcon property
};

const ToolsGrid: React.FC = () => {
  const starknetTools: ToolItem[] = [
    { name: "Token MultiSender", icon: <LuSendToBack /> },
    { name: "Batch Check Balance", icon: <FaBalanceScale /> },
    { name: "Token Batch Collection", icon: <HiOutlineCollection /> },
    { name: "Multiple to Multiple transfer", icon: <TbBinaryTree2 /> },
    { name: "Create Token", icon: <IoAddCircleOutline /> },
    { name: "Batch Wallet Generate", icon: <FaWallet /> },
  ];

  const suiTools: ToolItem[] = [
    { name: "Token MultiSender", icon: <LuSendToBack />},
    { name: "Batch Check Balance", icon: <FaBalanceScale /> },
    { name: "Token Batch Collection", icon: <HiOutlineCollection /> },
    { name: "Multiple to Multiple transfer", icon: <TbBinaryTree2 /> },
    { name: "Create Token", icon: <IoAddCircleOutline /> },
    { name: "Batch Wallet Generate", icon: <FaWallet /> },
  ];

  const inscriberTools: ToolItem[] = [
    { name: "Increase Maker Buyer", icon: <RiIncreaseDecreaseLine /> },
    { name: "Freeze/Unfreeze", icon: <GiBrainFreeze /> },
    { name: "Swap", icon: <IoMdSwap /> },
    { name: "Burn Token", icon: <FaBurn /> },
    { name: "Token Multi Sender", icon: <LuSendToBack /> },
    { name: "Bundled Sell", icon: <GiSellCard /> },
  ];

  return (
    <div className=" px-6 w-full my-6">
      <div className="flex justify-between flex-col sm:flex-row items-center gap-6 w-full">
        {/* Starknet Tools */}
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-[#1c1d32] w-full ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tron Tools</h2>
            <span className="text-sm text-blue-500">More</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {starknetTools.map((item, idx) => (
              <button
                key={idx}
                className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex items-center w-full text-sm">
                  {item.icon}
                  <span className="ml-2 text-sm">{item.name}</span>
                </span>
                {item.statusIcon && <span className=' text-sm'>{item.statusIcon}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* SUI Tools */}
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-[#1c1d32] w-full ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Sui Tools</h2>
            <span className="text-sm text-blue-500">More</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {suiTools.map((item, idx) => (
              <button
                key={idx}
                className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex items-center text-sm">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </span>
                {item.statusIcon && <span>{item.statusIcon}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Inscriber Tools */}
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-[#1c1d32] w-full ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Solana Tools</h2>
            <span className="text-sm text-blue-500">More</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {inscriberTools.map((item, idx) => (
              <button
                key={idx}
                className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex items-center text-sm">
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </span>
                {item.statusIcon && <span>{item.statusIcon}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsGrid;
