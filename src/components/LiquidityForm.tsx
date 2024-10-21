import React from "react";

const LiquidityForm = () => {
  return (
    <div className=" mx-auto my-4 w-full rounded-md  bg-white px-8 py-8 shadow-md dark:bg-[#191919]">
      <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
        Add liquidity
      </h2>
      <div>
        <div className="my-6 flex space-x-4">
          {/* Base Token Input */}
          <div className="w-full">
            <label
              htmlFor="base-token"
              className="mb-1 block text-sm font-medium text-black-2 dark:text-white"
            >
              * Base Token:
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
                type="text"
                id="base-token"
                className="w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919] mt-2"
                placeholder="Connect your wallet please."
              />
            </div>
          </div>

          {/* Quote Token Input */}
          <div className="w-full">
            <label
              htmlFor="quote-token"
              className="mb-1 block text-sm font-medium text-black-2 dark:text-white"
            >
              * Quote Token:
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
                type="text"
                id="quote-token"
                className="w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919] mt-2"
                placeholder="Connect your wallet please."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Base Section */}
        <div className="flex w-full flex-col items-start  justify-start  rounded-lg">
          <div className="flex w-full  ">
            <div className="mt-4 flex flex-col  w-full ">
            <span className=" text-sm text-black dark:text-white ">
                Balance: 1.00{" "}
              </span>
              <input
                type="number"
                placeholder="1"
                className="w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919] mt-2"
              />
             
            </div>
          </div>

          <div className="mt-4 rounded-md  bg-green-600 px-6 py-1 text-sm font-semibold text-white">
            Token{" "}
          </div>
        </div>

        <div className=" flex items-center justify-center">
          <span className="flex h-[40px]  items-center text-center rounded-md bg-white p-4 text-2xl text-gray-700">
            +
          </span>
        </div>

        {/* Quote Section */}
        <div className="flex w-full flex-col items-start  justify-start rounded-lg ">
          <div className="flex w-full ">
            <div className="mt-4 flex   flex-col w-full">
            <span className=" text-sm text-black dark:text-white">
                Balance: 1.00{" "}
              </span>
              <input
                type="number"
                placeholder="1"
                className="w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919] mt-2"
              />
            
            </div>
          </div>

          <div className="mt-4 rounded-md  bg-green-600 px-6 py-1 text-sm font-semibold text-white">
            Eth
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiquidityForm;
