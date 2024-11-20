import React from "react";
import ShowDate from "./ShowDate";
import { dotSpinner } from "ldrs";
import { HiPencil, HiTrash } from "react-icons/hi";
import { apiUrl } from "../api/constant";
import reactUseCookie from "react-use-cookie";
import { useSWRConfig } from "swr";
import { Link } from "react-router-dom";

const ProductRow = ({
  product: { id, product_name, price, created_at, updated_at },
  index,
}) => {
  dotSpinner.register();
  const [tokenCookie] = reactUseCookie("token");
  const { mutate } = useSWRConfig();
  const handleDelBtn = async () => {
    const res = await fetch(`${apiUrl}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenCookie}`,
      },
    });

    if (res.ok) {
      mutate(`${apiUrl}/products`);
    } else {
      console.log("something wrong at product delete");
    }
  };

  return (
    <tr className="bg-white border-b font-medium">
      <td className="px-6 py-4">{id}</td>
      <th scope="row" className="px-6 py-4 text-gray-700 whitespace-nowrap ">
        {product_name}
      </th>
      <td className="px-6 py-4 text-end">{price}</td>
      <ShowDate timestamp={created_at} />
      <ShowDate timestamp={updated_at} />
      <td className="px-6 py-4  text-end ">
        <div className=" flex justify-end items-center space-x-1">
          <Link
            to={`/dashboard/product/edit/${id}`}
            className=" size-9 flex justify-center items-center border border-stone-300 shadow hover:bg-gray-100 duration-200"
          >
            <HiPencil className=" size-5" />
          </Link>
          <button
            onClick={handleDelBtn}
            className="size-9 flex justify-center items-center border border-stone-300 hover:border-red-300 shadow hover:bg-red-100 duration-200"
          >
            <HiTrash className=" size-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
