"use client";

import React from "react";
import LiquidityForm from "./LiquidityForm";
import WalletBuyParameters from "./WalletBuyParameters";
import SniperToken from "./SniperToken";

const TokenBundleUI = () => {
  return (
    <div>
      <div className="mx-auto my-4 w-full  px-8 py-8 ">
      {/* <WalletBuyParameters /> */}
      <SniperToken/>
   
      </div>
    
    </div>
  );
};

export default TokenBundleUI;
