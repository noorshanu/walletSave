import React from "react";
import CreateTokenForm from "../../components/CreateTokenForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

function page() {
  return (
 <>
 <DefaultLayout>
 <div className=" mt-2 pb-4">
      <CreateTokenForm />
    </div>
 </DefaultLayout>
 </>
  );
}

export default page;
