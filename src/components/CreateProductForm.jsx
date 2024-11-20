import React from "react";
import { useForm } from "react-hook-form";
import { apiUrl } from "../api/constant";
import reactUseCookie from "react-use-cookie";
import { useNavigate } from "react-router-dom";

const CreateProductForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tokenCookie] = reactUseCookie("token");
  const nav = useNavigate();

  const handleCreateProductForm = async (data) => {
    const { product_name, price } = data;
    const res = await fetch(`${apiUrl}/products`, {
      method: "POST",
      body: JSON.stringify({ product_name, price }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenCookie}`,
      },
    });
    const json = await res.json();
    if (data.back_to_product) {
      nav("/dashboard/product");
    }

    reset();
  };

  return (
    <div className=" flex flex-col gap-3  p-5">
      <h2 className=" font-bold text-2xl text-center">Create New Product</h2>
      <p className=" font-medium text-stone-500 w-2/3 text-center mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam eum
        ipsum enim maiores. Mollitia aut quae alias ullam quasi fuga!
      </p>
      <form
        onSubmit={handleSubmit(handleCreateProductForm)}
        className=" flex flex-col  gap-3.5 w-2/3 mx-auto font-medium py-3"
      >
        <div className=" flex flex-col  gap-2 w-1/2 mx-auto">
          <label
            htmlFor="product_name"
            className={`text-sm  font-semibold  text-stone-700`}
          >
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            {...register("product_name", { required: true })}
            className={`border focus-visible:outline-none ring-1 px-3 py-1.5 border-stone-500 ring-stone-500 focus:border-stone-500 focus:ring-stone-500 rounded-lg text-sm   w-full bg-stone-50 `}
          />
          {errors.product_name?.type === "required" && (
            <p className=" text-xs text-red-500">Product Name is Required</p>
          )}
        </div>

        <div className=" flex flex-col  gap-2 w-1/2 mx-auto">
          <label
            htmlFor="product_price"
            className={`text-sm  font-semibold text-stone-700`}
          >
            Product Price
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            id="product_price"
            className={`border focus-visible:outline-none border-stone-500 ring-stone-500 focus:border-stone-500 focus:ring-stone-500 ring-1 px-3 py-1.5 rounded-lg text-sm   w-full bg-stone-50 `}
          />
          {errors.price?.type === "required" && (
            <p className=" text-xs text-red-500">Product Price is Required</p>
          )}
        </div>

        <div className=" flex items-center justify-between w-1/2 mx-auto ">
          <div className=" flex items-center gap-1.5">
            <input
              type="checkbox"
              id="all_correct"
              {...register("all_correct", { required: true })}
              className=" accent-stone-700 size-4"
            />
            <label
              htmlFor="all_correct"
              className="text-sm text-stone-700 font-semibold select-none"
            >
              {!errors.all_correct && "Make Sure"}
            </label>
            {errors.all_correct?.type === "required" && (
              <label htmlFor="all_correct" className=" text-xs text-red-500">
                Required
              </label>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <input
              type="checkbox"
              id="back_to_product"
              {...register("back_to_product")}
              className=" accent-stone-700 size-4"
            />
            <label
              htmlFor="back_to_product"
              className="text-sm text-stone-700 font-semibold select-none"
            >
              Back To Product
            </label>
          </div>
        </div>

        <button
          type="submit"
          className=" border flex justify-center items-center gap-3 border-stone-800 hover:bg-stone-700 active:bg-stone-600 duration-200 bg-stone-800 text-stone-50 rounded-full py-1.5 w-1/2 mx-auto  mt-2"
        >
          Create Product{" "}
        </button>
      </form>
    </div>
  );
};

export default CreateProductForm;
