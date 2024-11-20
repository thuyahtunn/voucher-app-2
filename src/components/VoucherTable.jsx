import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import useSWR from "swr";
import { apiUrl } from "../api/constant";
import reactUseCookie from "react-use-cookie";
import VoucherTableRow from "./VoucherTableRow";
import Pagination from "./Pagination";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";

const VoucherTable = () => {
  const [tokenCookie] = reactUseCookie("token");
  const location = useLocation();
  console.log(location.search);
  const [fetchUrl, setFetchUrl] = useState(`${apiUrl}/vouchers`);
  console.log(fetchUrl);
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenCookie}`,
      },
    }).then((res) => res.json());
  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);
  const handleSearchInput = debounce((e) => {
    setFetchUrl(`${apiUrl}/vouchers?q=${e.target.value}`);
  }, 500);
  const updateUrl = (arg) => {
    setFetchUrl(arg);
  };

  return (
    <>
      <div className="relative overflow-x-auto border  shadow-md rounded-lg">
        <div className=" w-full flex justify-start items-center py-3.5 px-5">
          <div className="relative w-1/3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none pt-0.5">
              <HiSearch className=" w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              onChange={handleSearchInput}
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 font-medium text-gray-900 text-sm rounded-lg w-full ps-10 p-2.5  "
              placeholder="Search"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-700 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 text-start">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                Voucher ID
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3 text-start">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                CREATED AT
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="bg-white border-b font-medium">
                <td colSpan={5} className="px-6 py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              data?.data.map((voucher, index) => (
                <VoucherTableRow key={index} voucher={voucher} />
              ))
            )}
          </tbody>
        </table>
      </div>
      {data && (
        <Pagination links={data.links} meta={data.meta} updateUrl={updateUrl} />
      )}
    </>
  );
};

export default VoucherTable;
