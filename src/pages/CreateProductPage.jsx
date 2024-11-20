import React from "react";
import ContainerSection from "../components/ContainerSection";
import Breadcrumb from "../components/Breadcrumb";
import CreateProductForm from "../components/CreateProductForm";

const CreateProductPage = () => {
  return (
    <ContainerSection>
      <Breadcrumb
        currentPageTitle={"Create Product"}
        links={[{ pageTitle: "Product", pathName: "/dashboard/product" }]}
      />
      <CreateProductForm />
    </ContainerSection>
  );
};

export default CreateProductPage;
