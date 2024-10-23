import React from "react";

const LiquidityForm = () => {
  return (
    <div className=" mx-auto my-4 w-full rounded-md  bg-white px-8 py-8 shadow-md dark:bg-[#191919]">
      <h2 className="mb-4 text-lg font-semibold text-black dark:text-white">
        Add liquidity
      </h2>
      <div>
        <div className="my-6 flex flex-col  gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium">Token Address</label>
            <select className="mt-1 block w-full rounded-md border border-gray-700 bg-white px-3 py-2 text-sm dark:bg-[#191919]">
              <option value="">NOT SET</option>

              <option>Token addresss</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Quote Section */}
        <div className="flex w-full flex-col items-start  justify-start rounded-lg ">
          <div className="flex w-full ">
            <div className="mt-4 flex   w-full flex-col">
              <span className=" text-sm text-black dark:text-white">
                Balance: 1.00{" "}
              </span>
              <input
                type="number"
                placeholder="%"
                className="mt-2 w-full rounded-md border border-[#434C59] bg-white p-2 shadow-lg dark:bg-[#191919]"
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
