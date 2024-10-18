import React from "react";

function TokenDetails() {
  return (
    <div className="bg-gray-300 dark:bg-[#191919] my-8 p-8 rounded-md w-full  mx-auto shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white text-black-2">
          Token: CyZq3sULrbByuDc...
        </h1>
        <a href="/create-token" className="bg-gradient-to-r from-purple-500 to-blue-500 dark:text-white text-black-2 py-2 px-4 rounded-md font-semibold">
          New Token
        </a>
      </div>

      {/* Token Details Section */}
      <div className="grid grid-cols-2 gap-6 bg-gray-200 dark:bg-[#191919] p-6 rounded-md shadow">
        <div>
          <h2 className="text-lg font-semibold dark:text-white text-black-2 mb-2">Chain</h2>
          <p className="font-medium dark:text-white text-black-2">Bsc</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold dark:text-white text-black-2 mb-2">Token Name</h2>
          <p className="font-medium dark:text-white text-black-2">Neeraj</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold dark:text-white text-black-2 mb-2">Token Symbol</h2>
          <p className="font-medium dark:text-white text-black-2">Nee</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold dark:text-white text-black-2 mb-2">Token Address</h2>
          <p className="font-medium dark:text-white text-black-2">
            NCyZq3sULrbByuDc...ee
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold dark:text-white text-black-2 mb-2">Dev Wallet</h2>
          <p className="font-medium dark:text-white text-black-2">
            sgsiMARpcYe1qKjABt4VdeSNK7HdXuw7G3upRhZBtdjdjjaifs
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold dark:text-white text-black-2 mb-2">Funding Wallet</h2>
          <p className="font-medium dark:text-white text-black-2">
            9R3b2NEWdFj8yGQQZZMUE...SCktKrn48aYZdkdakfkrkmdfkmsekii
          </p>
        </div>
      </div>
    </div>
  );
}

export default TokenDetails;
