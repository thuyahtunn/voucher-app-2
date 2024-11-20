import React from "react";

const ContainerSection = ({ className, children }) => {
  return (
    <section
      className={` w-full px-5 sm:px-10 md:px-0 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto ${className}`}
    >
      {children}
    </section>
  );
};

export default ContainerSection;
