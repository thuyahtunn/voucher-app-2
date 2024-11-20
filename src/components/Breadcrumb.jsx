import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ currentPageTitle, links }) => {
  return (
    <ol className="flex items-center whitespace-nowrap mb-5 print:hidden">
      <li className="inline-flex items-center">
        <Link
          className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 "
          to={"/dashboard"}
        >
          Home
        </Link>
        <svg
          className="shrink-0 mx-2 size-4 text-gray-400 "
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </li>
      {links &&
        links.map((link, index) => (
          <li key={index} className="inline-flex items-center">
            <Link
              className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 "
              to={link.pathName}
            >
              {link.pageTitle}
              <svg
                className="shrink-0 mx-2 size-4 text-gray-400 "
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </li>
        ))}
      <li
        className="inline-flex items-center text-sm font-semibold text-gray-800 truncate "
        aria-current="page"
      >
        {currentPageTitle}
      </li>
    </ol>
  );
};

export default Breadcrumb;
