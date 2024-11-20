import React from "react";
import ContainerSection from "../components/ContainerSection";
import Breadcrumb from "../components/Breadcrumb";
import ProductTable from "../components/ProductTable";

const ProductPage = () => {
  return (
    <ContainerSection>
      <Breadcrumb currentPageTitle={"Product"} />
      <ProductTable />
    </ContainerSection>
  );
};

export default ProductPage;
