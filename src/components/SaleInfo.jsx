import React from "react";
import { useForm } from "react-hook-form";
import useRecordStore from "../store/useRecordStore";
import { apiUrl } from "../api/constant";
import reactUseCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";

const SaleInfo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { records, resetRecord } = useRecordStore();
  const [tokenCookie] = reactUseCookie("token");
  const nav = useNavigate();
  const total = records.reduce((pv, cv) => pv + cv.cost, 0);
  const tax = total * 0.05;
  const net_total = total + tax;

  const handleSaleForm = async (data) => {
    const { voucher_id, customer_email, customer_name, sale_date } = data;
    const res = await fetch(`${apiUrl}/vouchers`, {
      method: "POST",
      body: JSON.stringify({
        voucher_id,
        customer_email,
        customer_name,
        sale_date,
        records: [...records],
        total,
        tax,
        net_total,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenCookie}`,
      },
    });
    const json = await res.json();
    if (data.to_voucher_detail) {
      nav(`/dashboard/voucher/detail/${json.data.id}`);
    }
    resetRecord();
    reset();
  };
  const generateInvoiceId = () => {
    const prefix = "INV";
    const date = new Date();

    // Get date parts for uniqueness
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Generate a random number for extra uniqueness
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    // Combine all parts into the invoice ID
    return `${prefix}-${year}${month}${day}-${randomNum}`;
  };
  return (
    <form
      onSubmit={handleSubmit(handleSaleForm)}
      noValidate
      id="sale_form"
      className=" col-span-1"
    >
      <div className=" flex flex-col gap-2 h-full">
        <div className="  flex flex-col gap-1 ">
          <label htmlFor="invoice_id" className=" font-medium text-sm">
            Invoice ID
          </label>
          <input
            type="text"
            defaultValue={generateInvoiceId()}
            {...register("voucher_id", { required: true })}
            className="border-2 border-stone-400  px-3 py-1.5 rounded bg-stone-50 text-sm font-medium"
          />
        </div>
        <div className="  flex flex-col gap-1 ">
          <label
            htmlFor="customer_name"
            className={`font-medium text-sm ${
              !errors.customer_name ? "text-stone-800" : " text-red-500"
            }`}
          >
            Customer Name
          </label>
          <input
            type="text"
            {...register("customer_name", { required: true })}
            id="customer_name"
            className={`border-2   px-3 py-1.5 rounded bg-stone-50 text-sm font-medium ${
              !errors.customer_name
                ? "border-stone-400 focus:ring-stone-600"
                : "border-red-400 focus:ring-red-600 focus:border-red-400"
            }`}
          />
          {errors.customer_name?.type === "required" && (
            <p className=" text-xs text-red-500 font-medium">
              Customer Name is required
            </p>
          )}
        </div>
        <div className="  flex flex-col gap-1 ">
          <label
            htmlFor="customer_email"
            className={`font-medium text-sm ${
              !errors.customer_email ? "text-stone-800" : " text-red-500"
            }`}
          >
            Customer Email
          </label>
          <input
            type="email"
            {...register("customer_email", { required: true })}
            id="customer_email"
            className={`border-2   px-3 py-1.5 rounded bg-stone-50 text-sm font-medium ${
              !errors.customer_email
                ? "border-stone-400 focus:ring-stone-600"
                : "border-red-400 focus:ring-red-600"
            }`}
          />
          {errors.customer_email?.type === "required" && (
            <p className=" text-xs text-red-500 font-medium">
              Customer Email is required
            </p>
          )}
        </div>
        <div className="  flex flex-col gap-1 ">
          <label
            htmlFor="sale_date"
            className={`font-medium text-sm ${
              !errors.sale_date ? "text-stone-800" : " text-red-500"
            }`}
          >
            Sale Date
          </label>
          <input
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            id="sale_date"
            {...register("sale_date", { required: true })}
            className={`border-2   px-3 py-1.5 rounded bg-stone-50 text-sm font-medium ${
              !errors.sale_date
                ? "border-stone-400 focus:ring-stone-600"
                : "border-red-400 focus:ring-red-600"
            }`}
          />
          {errors.sale_date?.type === "required" && (
            <p className=" text-xs text-red-500 font-medium">
              Sale Date is required
            </p>
          )}
        </div>

        <div className=" flex flex-col gap-1.5 mt-auto">
          <div className=" flex justify-between items-center gap-2">
            <div className=" flex justify-center items-center gap-1">
              <input
                type="checkbox"
                id="confirm_check"
                {...register("confirm_check", { required: true })}
                className=" size-3 accent-stone-800"
              />
              <label
                htmlFor="confirm_check"
                className={`text-sm  select-none ${
                  errors.confirm_check
                    ? " font-bold text-red-500"
                    : "font-medium text-stone-800"
                }`}
              >
                {errors.confirm_check ? "Confirm Required" : "Confirm"}
              </label>
            </div>

            <div className=" flex justify-center items-center gap-1">
              <input
                type="checkbox"
                id="to_voucher_detail"
                {...register("to_voucher_detail")}
                className=" size-3 accent-stone-800"
              />
              <label
                htmlFor="to_voucher_detail"
                className=" text-sm font-medium text-stone-800 select-none"
              >
                Redirect To Voucher
              </label>
            </div>
          </div>
          <button
            form="sale_form"
            type="submit"
            className=" flex justify-center w-full py-2 items-center gap-2 border-2 border-stone-700 text-stone-50 rounded-md bg-stone-700"
          >
            Confirm Voucher{" "}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SaleInfo;
