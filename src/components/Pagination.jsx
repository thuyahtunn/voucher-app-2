import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const Pagination = ({
  links: { prev, next },
  meta: { from, to, total },
  updateUrl,
}) => {
  const handlePrevBtn = () => {
    updateUrl(prev);
  };
  const handleNextBtn = () => {
    updateUrl(next);
  };
  return (
    <div className="flex justify-between px-6 py-4 items-center">
      <span className="text-sm text-gray-700 ">
        Showing <span className="font-semibold text-gray-900 ">{from}</span> to{" "}
        <span className="font-semibold text-gray-900 ">{to}</span> of{" "}
        <span className="font-semibold text-gray-900 ">{total}</span> Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0 gap-1">
        <button
          onClick={handlePrevBtn}
          disabled={!prev}
          className="size-9 flex justify-center items-center border border-stone-300 shadow disabled:opacity-60 hover:bg-gray-100 duration-200 font-medium "
        >
          <HiArrowLeft />
        </button>
        <button
          onClick={handleNextBtn}
          disabled={!next}
          className="size-9 flex justify-center items-center border border-stone-300 shadow disabled:opacity-60 hover:bg-gray-100 duration-200 font-medium  "
        >
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
