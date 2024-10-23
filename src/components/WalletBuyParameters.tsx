import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiExpandUpDownFill } from "react-icons/ri";
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
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white text-black mb-4">Sinper list</h2>
        <button className="bg-primary-gradient  rounded-md px-4 py-2 font-semibold text-white flex items-center gap-2">
        <IoMdRefreshCircle />   Refresh 
        </button>
      </div>

      <div className="overflow-x-auto w-[350px] sm:w-full">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="">
            <tr className="text-left">
           
              <th className="border p-3">
              <div className="flex items-center justify-between gap-4">
                    {" "}
                    Address <RiExpandUpDownFill />
                  </div>
               </th>
              <th className="border p-3">
              <div className="flex items-center justify-between gap-4">
                    {" "}
                    Native Token Balance <RiExpandUpDownFill />
                  </div>
                </th>
              <th className="border p-3">
              <div className="flex items-center justify-between gap-4">
                    {" "}
                    Token Balance <RiExpandUpDownFill />
                  </div>
               </th>
              <th className="border p-3">
              <div className="flex items-center justify-between gap-4">
                    {" "}
                    Action <RiExpandUpDownFill />
                  </div>
              </th>
              <th className="border p-3">  <div className="flex items-center justify-between gap-4">
                    {" "}
                    Add <RiExpandUpDownFill />
                  </div></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
             
                <td className="border p-3 text-center">–</td>
                <td className="border p-3 text-center">–</td>
                <td className="border p-3 text-center">–</td>
                <td className="border p-3">
                  <div className="flex gap-4 justify-center items-center">
                    <button className="text-sm bg-green-600 rounded-md py-1 px-6 text-white font-semibold">
                      Fund
                    </button>
                    <button className="text-sm bg-red-600 rounded-md py-1 px-6 text-white font-semibold">Sell</button>
                    <button className="text-sm bg-green-600 rounded-md py-1 px-6 text-white font-semibold">
                      Buy
                    </button>
                  </div>
                </td>
                <td className="border p-3 text-center">
                  {index === rows.length - 1 ? (
                    <button onClick={addRow} className="p-2 bg-green-600 border border-green-300 rounded-lg">
                      <AiOutlinePlus />
                    </button>
                  ) : (
                    <button
                      onClick={() => removeRow(index)}
                      className="p-2 bg-red-600 border border-red-300 rounded-lg"
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
        <button className="text-sm text-black-2 dark:text-white flex items-center">
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
