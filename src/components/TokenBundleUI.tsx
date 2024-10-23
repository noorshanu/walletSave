"use client";

import React from "react";
import LiquidityForm from "./LiquidityForm";
import WalletBuyParameters from "./WalletBuyParameters";
import SniperToken from "./SniperToken";

const TokenBundleUI = () => {
  return (
    <div>
      <div className="mx-auto w-full px-4  rounded-md bg-white py-8 shadow-lg dark:bg-[#191919]">



        {/* Wallet Info Section */}
        <div className="mt-6  rounded-md p-6 shadow">
          <div className="grid gird-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Funding Wallet</h3>
              <p className="break-all">
                sgsiMARpcYe1qKjABt4VdeSNK7HdXuw7G3upRhZBtd
              </p>
             
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
        {/* <LiquidityForm /> */}
        
      </div>
      <div className="mx-auto my-4 w-full rounded-md  bg-white px-8 py-8 shadow-lg dark:bg-[#191919]">
      {/* <WalletBuyParameters /> */}
      <SniperToken/>
   
      </div>
    
    </div>
  );
};

export default TokenBundleUI;
