import React, { useState } from "react";
import { HiArrowRight, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { dotSpinner } from "ldrs";
import ShowDate from "./ShowDate";

const VoucherTableRow = ({
  voucher: {
    id,
    voucher_id,
    customer_name,
    customer_email,
    sale_date,
    net_total,
  },
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  dotSpinner.register();
  return (
    <tr className="bg-white border-b font-medium">
      <td className="px-6 py-4 text-start">{id}</td>

      <td className="px-6 py-4 text-start">{voucher_id}</td>
      <th scope="row" className="px-6 py-4 text-gray-700 whitespace-nowrap ">
        {customer_name}
      </th>
      <td className="px-6 py-4 text-start">{customer_email}</td>
      <ShowDate timestamp={sale_date} />
      <td className="px-6 py-4 text-end ">{parseInt(net_total).toFixed(0)}</td>

      <td className="px-6 py-4  text-end ">
        <div className=" flex justify-end items-center ">
          <Link
            to={`/dashboard/voucher/detail/${id}`}
            className="size-9 flex justify-center items-center border border-stone-300 hover:border-red-300 shadow hover:bg-red-100 duration-200"
          >
            <HiArrowRight className=" size-5 " />
          </Link>
          <button className="size-9 flex justify-center items-center border border-stone-300 hover:border-red-300 shadow hover:bg-red-100 duration-200">
            {!isDeleting ? (
              <HiTrash className=" size-5 text-red-500" />
            ) : (
              <l-dot-spinner size="20" speed="0.8" color="red"></l-dot-spinner>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default VoucherTableRow;
