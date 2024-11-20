import React from "react";
import { useParams } from "react-router-dom";
import ContainerSection from "../components/ContainerSection";
import Breadcrumb from "../components/Breadcrumb";
import VoucherDetailSection from "../components/VoucherDetailSection";

const VoucherDetailPage = () => {
  const { id } = useParams();

  return (
    <ContainerSection>
      <Breadcrumb
        currentPageTitle={"Voucher Detail"}
        links={[{ pageTitle: "Voucher", pathName: "/dashboard/voucher" }]}
      />
      <VoucherDetailSection />
    </ContainerSection>
    // <Container>
    //   <BreadCrumb
    //     pageTitle={"Voucher Detail"}
    //     links={[{ pathName: "/voucher", currentPageTitle: "Voucher" }]}
    //   />
    //   <VoucherDetailSection />
    // </Container>
  );
};

export default VoucherDetailPage;
