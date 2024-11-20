import React from "react";

const SkeletonLoaderRows = () => {
  return (
    <tr className="bg-white border-b font-medium animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
      </td>
      <th scope="row" className="px-6 py-4">
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
      </th>
      <td className="px-6 py-4 flex flex-col items-end">
        <div className="h-6 w-12 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-4 text-end text-xs">
        <div className="flex flex-col items-end space-y-1">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </td>
      <td className="px-6 py-4 text-end text-xs">
        <div className="flex flex-col items-end space-y-1">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </td>
      <td className="px-6 py-4 text-end">
        <div className="flex justify-end items-center space-x-1">
          <div className="h-9 w-9 bg-gray-300 "></div>
          <div className="h-9 w-9 bg-gray-300 "></div>
        </div>
      </td>
    </tr>
  );
};

export default SkeletonLoaderRows;
