import React from "react";
import SaleTableRow from "./SaleTableRow";
import useRecordStore from "../store/useRecordStore";

const SaleTable = () => {
  const { records } = useRecordStore();
  const total = records.reduce((pv, cv) => pv + cv.cost, 0);
  const tax = total * 0.05;
  const netTotal = total + tax;
  return (
    <div className="relative overflow-x-auto border  shadow-md rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-700 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2">
          <tr>
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3 text-end">
              Price (MMK)
            </th>
            <th scope="col" className="px-6 py-3 text-end">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-end">
              Cost
            </th>
            <th scope="col" className="px-6 py-3 text-end"></th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records.map((record, index) => (
              <SaleTableRow key={index} index={index} record={record} />
            ))}
        </tbody>
        {records.length > 0 && (
          <tfoot>
            <tr className="bg-white border-b font-medium">
              <td colSpan={4} className="px-6 py-3 text-end ">
                Total
              </td>
              <td className="px-6 py-3 text-end ">{total.toFixed(2)}</td>
              <td className="px-6 py-3 text-end "></td>
            </tr>
            <tr className="bg-white border-b font-medium">
              <td colSpan={4} className="px-6 py-3 text-end ">
                Tax (5%)
              </td>
              <td className="px-6 py-3 text-end ">{tax.toFixed(2)}</td>
              <td className="px-6 py-3 text-end "></td>
            </tr>
            <tr className="bg-white border-b font-medium">
              <td colSpan={4} className="px-6 py-3 text-end ">
                Net Total
              </td>
              <td className="px-6 py-3 text-end ">{netTotal.toFixed(2)}</td>
              <td className="px-6 py-3 text-end "></td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default SaleTable;
