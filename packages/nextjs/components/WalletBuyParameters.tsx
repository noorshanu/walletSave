import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// React Icons for Plus and Minus buttons
import { IoMdRefreshCircle } from "react-icons/io";

interface Row {
  privateKey: string;
  buyAmount: string;
}

const WalletBuyParameters = () => {
  const [rows, setRows] = useState<Row[]>([{ privateKey: "", buyAmount: "" }]);

  const addRow = () => {
    setRows([...rows, { privateKey: "", buyAmount: "" }]);
  };

  const removeRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name as keyof Row] = value;
    setRows(newRows);
  };

  return (
    <div className="bg-white dark:bg-[#22223e] p-6 rounded-lg shadow-md max-w-6xl mx-auto border">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold dark:text-white text-black mb-4">Wallet Settings</h2>
        <button className="text-green-600 text-lg flex items-center gap-2">
          Refresh <IoMdRefreshCircle />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100 dark:bg-[#22223e]">
            <tr className="text-left">
              <th className="border p-3">* Private Key</th>
              <th className="border p-3">Address</th>
              <th className="border p-3">Native Token Balance</th>
              <th className="border p-3">Token Balance</th>
              <th className="border p-3">Action</th>
              <th className="border p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-3">
                  <input
                    type="text"
                    name="privateKey"
                    placeholder="Enter Private Key"
                    value={row.privateKey}
                    onChange={event => handleInputChange(index, event)}
                    className="w-full p-2 border border-gray-300 rounded bg-transparent"
                  />
                </td>
                <td className="border p-3 text-center">–</td>
                <td className="border p-3 text-center">–</td>
                <td className="border p-3 text-center">–</td>
                <td className="border p-3">
                  <div className="flex gap-4 justify-center items-center">
                    <button className="text-sm bg-green-600 rounded-full py-1 px-6 text-white font-semibold">
                      Fund
                    </button>
                    <button className="text-sm bg-red-600 rounded-full py-1 px-6 text-white font-semibold">Sell</button>
                    <button className="text-sm bg-green-600 rounded-full py-1 px-6 text-white font-semibold">
                      Buy
                    </button>
                  </div>
                </td>
                <td className="border p-3 text-center">
                  {index === rows.length - 1 ? (
                    <button onClick={addRow} className="p-2 bg-green-600 border border-green-300 rounded-full">
                      <AiOutlinePlus />
                    </button>
                  ) : (
                    <button
                      onClick={() => removeRow(index)}
                      className="p-2 bg-red-600 border border-red-300 rounded-full"
                    >
                      <AiOutlineMinus />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button className="text-sm text-orange-500 flex items-center">
          <span className="mr-2">
            <AiOutlinePlus />
          </span>
          Batch Import Private Keys
        </button>
      </div>
    </div>
  );
};

export default WalletBuyParameters;
