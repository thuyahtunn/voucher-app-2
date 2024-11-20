import React from "react";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import useRecordStore from "../store/useRecordStore";

const SaleTableRow = ({
  record: { recordId, quantity, cost, product },
  index,
}) => {
  const { updateRecord, deleteRecord } = useRecordStore();
  const handleDelBtn = () => {
    deleteRecord(recordId);
  };
  const handleAddBtn = () => {
    updateRecord(recordId, 1);
  };
  const handleSubBtn = () => {
    quantity > 1 && updateRecord(recordId, -1);
  };
  return (
    <tr className="bg-white border-b font-medium">
      <td className="px-6 py-3">{index + 1}</td>
      <th scope="row" className="px-6 py-3 text-gray-700 whitespace-nowrap ">
        {product.product_name}
      </th>
      <td className="px-6 py-3 text-end">{product.price}</td>
      <td className="px-6 py-3 text-end ">
        <div className=" flex justify-end items-center gap-3">
          <button
            onClick={handleSubBtn}
            className=" size-6 border-2 border-stone-200 flex justify-center items-center rounded-full hover:bg-stone-200 duration-200"
          >
            <HiMinus className=" size-3" />
          </button>
          {quantity}
          <button
            onClick={handleAddBtn}
            className=" size-6 flex justify-center border-2 border-stone-200 items-center rounded-full hover:bg-stone-200 duration-200"
          >
            <HiPlus className=" size-3" />
          </button>
        </div>
      </td>
      <td className="px-6 py-3 text-end ">{cost.toFixed(2)}</td>
      <td className="px-6 py-3  flex justify-end">
        <button
          onClick={handleDelBtn}
          className="size-9 flex justify-center items-center border border-stone-300 hover:border-red-300 shadow hover:bg-red-100 duration-200"
        >
          <HiTrash className=" size-4" />
        </button>
      </td>
    </tr>
  );
};

export default SaleTableRow;
