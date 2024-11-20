import React from "react";
import ContainerSection from "../components/ContainerSection";
import Breadcrumb from "../components/Breadcrumb";
import VoucherTable from "../components/VoucherTable";

const VoucherPage = () => {
  return (
    <ContainerSection>
      <Breadcrumb currentPageTitle={"Voucher"} />
      <VoucherTable />
    </ContainerSection>
  );
};

export default VoucherPage;
