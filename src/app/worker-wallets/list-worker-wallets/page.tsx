import React from "react";
import { FaListUl } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdAddToPhotos } from "react-icons/md";
import ListWallets from "../../../components/Listwallets";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

function page() {
  return (
  <>
  <DefaultLayout>
  <div className=" p-4 container mx-auto mt-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 ">Wallet List</h2>
      </div>
      <div className=" flex gap-4  ">
        <ListWallets />
        <div className=" flex flex-col  gap-4  mt-2 ">
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
  </DefaultLayout>
  </>
  );
}

export default page;
