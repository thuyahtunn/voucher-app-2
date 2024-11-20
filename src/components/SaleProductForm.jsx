import React from "react";
import { useForm } from "react-hook-form";
import reactUseCookie from "react-use-cookie";
import useSWR from "swr";
import { apiUrl } from "../api/constant";
import useRecordStore from "../store/useRecordStore";

const SaleProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [tokenCookie] = reactUseCookie("token");
  const { records, addRecord, updateRecord } = useRecordStore();
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenCookie}`,
      },
    }).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `${apiUrl}/products?limit=100`,
    fetcher
  );

  const handleAddProductBtn = (formData) => {
    const { product_select, sale_quantity } = formData;
    const currentProduct = data?.data.find(
      (product) => product.id === parseInt(product_select)
    );
    const isExistedRow = records.find(
      (record) => record.product_id === currentProduct.id
    );
    if (!isExistedRow) {
      const newRecord = {
        recordId: Date.now(),
        product_id: currentProduct.id,
        quantity: sale_quantity,
        product: currentProduct,
        created_at: new Date().toISOString(),
        cost: currentProduct.price * sale_quantity,
      };
      addRecord(newRecord);
    } else {
      updateRecord(isExistedRow.recordId, sale_quantity);
    }
    reset();
  };

  return (
    <section className=" p-3 border shadow-sm rounded-lg">
      <form onSubmit={handleSubmit(handleAddProductBtn)}>
        <div className=" grid grid-cols-3 md:grid-cols-5 items-center gap-4 md:gap-8">
          <div className=" col-span-1 md:col-span-2 flex flex-col gap-1">
            <label className=" font-medium text-sm">Select Your Product</label>
            <select
              {...register("product_select")}
              className=" border-2 border-stone-400  bg-stone-50 px-3 py-2 rounded  text-sm font-medium"
            >
              <option>Select a Product</option>
              {data?.data &&
                data?.data.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.product_name}
                  </option>
                ))}
            </select>
          </div>
          <div className=" col-span-1 md:col-span-2 flex flex-col gap-1">
            <label htmlFor="sale_quantity" className="font-medium text-sm">
              Quantity
            </label>
            <input
              type="number"
              id="sale_quantity"
              {...register("sale_quantity")}
              className={`border-2   px-3 py-2 rounded bg-stone-50 text-sm font-medium ${
                !errors.sale_quantity
                  ? "border-stone-400 focus:ring-stone-600"
                  : "border-red-400 focus:ring-red-600"
              }`}
            />
          </div>

          <button
            type="submit"
            className=" col-span-1 h-full text-sm hover:bg-stone-600 duration-200 hover:text-stone-50 flex justify-center items-center rounded border-2 border-stone-600 bg-stone-50 text-stone-800"
          >
            Add Product
          </button>
        </div>
      </form>
    </section>
  );
};

export default SaleProductForm;
