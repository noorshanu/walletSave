"use client";

import React from "react";
import LiquidityForm from "./LiquidityForm";
import WalletBuyParameters from "./WalletBuyParameters";

const TokenBundleUI = () => {
  return (
    <div>
      <div className="mx-auto w-full px-4  rounded-md bg-white py-8 shadow-lg dark:bg-[#191919]">
        {/* Header Section */}
        <div className=" border-b  border-[#434C59]">
          <div className="mb-6 flex items-start sm:items-center flex-col-reverse sm:flex-row gap-4 justify-start sm:justify-between px-8 py-4">
            <h1 className="text-2xl font-bold text-black-2 dark:text-white">
              Token: CyZq3sULrbByuDc...
            </h1>
            <button className="bg-primary-gradient rounded-md px-4 py-2 text-white">
              New Token
            </button>
          </div>
        </div>

        {/* Bundle Status Section */}
        <div className="my-4 grid grid-cols-2 gap-6  border-b  border-[#434C59] p-6 shadow  sm:grid-cols-4">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Chain</h2>
            <p className="font-medium">Bsc</p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Token Name</h2>
            <p className="font-medium">neeraj</p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Token Symbol</h2>
            <p className="font-medium">nee</p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Token Address</h2>
            <a href="#" className="break-all text-blue-600 underline">
              CyZq3sULrbByuDc...
            </a>
          </div>
        </div>

        {/* Wallet Info Section */}
        <div className="mt-6  rounded-md p-6 shadow">
          <div className="grid gird-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Funding Wallet</h3>
              <p className="break-all">
                sgsiMARpcYe1qKjABt4VdeSNK7HdXuw7G3upRhZBtd
              </p>
              {/* <button className="bg-red-500 text-white py-2 px-4 mt-2 rounded-md">
              Withdraw
            </button> */}
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Dev Wallet</h3>
              <p className="break-all">
                9R3b2NEwdF1j8yGQQZZMUE...SCktKrn48aYZd
              </p>
              {/* <button className="bg-red-500 text-white py-2 px-4 mt-2 rounded-md">
              Withdraw
            </button> */}
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <LiquidityForm />
        
      </div>
      <div className="mx-auto my-4 w-full rounded-md  bg-white px-8 py-8 shadow-lg dark:bg-[#191919]">
      <WalletBuyParameters />
      <div className="flex items-center justify-center">
        <button className="bg-primary-gradient mt-4 w-full rounded-md px-4 py-2 font-semibold text-white ">
          Create Pool
        </button>
      </div>
      </div>
    
    </div>
  );
};

export default TokenBundleUI;
