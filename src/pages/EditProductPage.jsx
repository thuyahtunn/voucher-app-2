import React from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import ContainerSection from "../components/ContainerSection";
import Breadcrumb from "../components/Breadcrumb";
import { useForm } from "react-hook-form";
import { apiUrl } from "../api/constant";
import reactUseCookie from "react-use-cookie";
import useSWR from "swr";

const EditProductPage = () => {
  const { id } = useParams();
  const [tokenCookie] = reactUseCookie("token");

  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookie}`,
      },
    }).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `${apiUrl}/products/${id}`,
    fetcher
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();
  const handleEditProductForm = async (formData) => {
    const { product_name, price } = formData;
    const res = await fetch(`${apiUrl}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({ product_name, price }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCookie}`,
      },
    });
    if (res.ok) {
      nav("/dashboard/product");
      reset();
    } else {
      console.log("something wrong at edit product");
    }
  };
  return (
    <ContainerSection>
      <Breadcrumb
        currentPageTitle={"Edit"}
        links={[{ pathName: "/dashboard/product", pageTitle: "Product" }]}
      />
      <div className=" flex flex-col gap-3  p-5">
        <h2 className=" font-bold text-2xl text-center">Edit Product</h2>
        <p className=" font-medium text-stone-500 w-2/3 text-center mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          eum ipsum enim maiores. Mollitia aut quae alias ullam quasi fuga!
        </p>
        <form
          onSubmit={handleSubmit(handleEditProductForm)}
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
              defaultValue={data?.data.product_name}
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
              defaultValue={data?.data.price}
              {...register("price", { required: true })}
              id="product_price"
              className={`border focus-visible:outline-none border-stone-500 ring-stone-500 focus:border-stone-500 focus:ring-stone-500 ring-1 px-3 py-1.5 rounded-lg text-sm   w-full bg-stone-50 `}
            />
            {errors.price?.type === "required" && (
              <p className=" text-xs text-red-500">Product Price is Required</p>
            )}
          </div>

          <div className=" flex items-center w-1/2 mx-auto gap-1.5">
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

          <button
            type="submit"
            className=" border flex justify-center items-center gap-3 border-stone-800 hover:bg-stone-700 active:bg-stone-600 duration-200 bg-stone-800 text-stone-50 rounded-full py-1.5 w-1/2 mx-auto  mt-2"
          >
            Update Product
          </button>
        </form>
      </div>
    </ContainerSection>
  );
};

export default EditProductPage;
