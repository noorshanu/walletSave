import React from "react";
import CreateWorkerWallet from "../../components/CreateWorkerWallet";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Page = () => {
  return (
    <>
    <DefaultLayout>
    <div className=" mx-auto px-4 pt-4 pb-[38%] sm:pb-[17%] h-full ">
      <CreateWorkerWallet />
    </div>
    </DefaultLayout>
    </>
  );
};

export default Page;
