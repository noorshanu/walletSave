import React from "react";
import { FaListUl } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";
import SetWalletType from "~~/components/SetWalletType";

function page() {
  return (
    <div className=" p-4 sm:max-w-7xl mx-auto px-4 mt-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 ">Wallet List</h2>
      </div>
      <div className=" flex justify-center gap-4  ">
        <SetWalletType />
        <div className=" flex flex-col  gap-4  mt-2 w-full ">
          <a href="/worker-wallets" className=" flex items-center gap-3 font-semibold">
            {" "}
            <MdAddToPhotos /> Create Worker Wallets
          </a>

          <a href="/worker-wallets/list-worker-wallets" className=" flex items-center gap-3 font-semibold">
            {" "}
            <FaListUl />
            List Worker Wallets
          </a>

          <a href="/worker-wallets/set-wallet" className=" flex items-center gap-3 font-semibold">
            {" "}
            <IoSettings /> Set Wallet Types
          </a>
        </div>
      </div>
    </div>
  );
}

export default page;
