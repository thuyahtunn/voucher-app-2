import React from "react";
import ContainerSection from "../components/ContainerSection";
import Breadcrumb from "../components/Breadcrumb";
import SaleInfo from "../components/SaleInfo";
import SaleTable from "../components/SaleTable";
import SaleProductForm from "../components/SaleProductForm";

const SalePage = () => {
  return (
    <ContainerSection>
      <Breadcrumb currentPageTitle={"Sale"} />
      <section className=" gap-2 grid grid-cols-3 pb-3">
        <div className=" flex flex-col gap-2 col-span-2">
          <SaleProductForm />
          <SaleTable />
        </div>
        <SaleInfo />
      </section>
    </ContainerSection>
  );
};

export default SalePage;
