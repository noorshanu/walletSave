import React from "react";
import CreateTokenForm from "../../components/CreateTokenForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

function page() {
  return (
 <>
 <DefaultLayout>
 <div className=" mx-auto px-4 pt-4 pb-[38%] sm:pb-[17%] h-full">
      <CreateTokenForm />
    </div>
 </DefaultLayout>
 </>
  );
}

export default page;
