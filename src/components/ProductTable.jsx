import React, { useState } from "react";
import { HiArrowLeft, HiArrowRight, HiPlus, HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import SkeletonLoaderRows from "./SkeletonLoaderRows";
import useSWR from "swr";
import { apiUrl } from "../api/constant";
import reactUseCookie from "react-use-cookie";
import ProductRow from "./ProductRow";
import { debounce } from "lodash";
import Pagination from "./Pagination";

const ProductTable = () => {
  const [tokenCookie] = reactUseCookie("token");
  const [fetchUrl, setFetchUrl] = useState(`${apiUrl}/products`);
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenCookie}`,
      },
    }).then((res) => res.json());
  const { data, isLoading, error } = useSWR(`${fetchUrl}`, fetcher);
  const handleSearchInput = debounce((e) => {
    setFetchUrl(`${apiUrl}/products?q=${e.target.value}`);
  }, 500);
  const updateUrl = (arg) => {
    setFetchUrl(arg);
  };
  return (
    <div className=" p-5 border rounded-xl shadow">
      <div className=" w-full flex justify-between items-center mb-3">
        <div className="relative w-1/3">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none pt-0.5">
            <HiSearch className=" w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            onChange={handleSearchInput}
            className="bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg w-full ps-10 p-2.5  "
            placeholder="Search"
          />
        </div>
        <Link
          to={"/dashboard/product/create"}
          className=" flex justify-center items-center py-2.5 px-6 bg-stone-700 text-gray-50 text-sm rounded-lg font-medium  gap-2 border border-stone-700"
        >
          Add New Product
          <HiPlus className=" font-bold size-4" />
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
                Created AT
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Updated AT
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonLoaderRows />
            ) : (
              data?.data.map((product, index) => (
                <ProductRow key={product.id} product={product} index={index} />
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && (
        <Pagination
          links={data?.links}
          meta={data?.meta}
          updateUrl={updateUrl}
        />
      )}
    </div>
  );
};

export default ProductTable;
