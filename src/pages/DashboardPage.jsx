import React from "react";
import ContainerSection from "../components/ContainerSection";
import ModuleBtn from "../components/ModuleBtn";
import { HiDatabase, HiShoppingBag, HiUser } from "react-icons/hi";
import { HiComputerDesktop } from "react-icons/hi2";
import reactUseCookie, { removeCookie } from "react-use-cookie";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [tokenCookie] = reactUseCookie("token");
  const nav = useNavigate();
  const handleLogoutBtn = () => {
    removeCookie("user");
    removeCookie("token");
    nav("/");
  };

  return (
    <ContainerSection className=" h-full flex flex-col ">
      <div className=" grid  grid-cols-1 md:grid-cols-3 px-10 md:px-0 gap-5 py-10">
        <ModuleBtn
          icon={<HiShoppingBag className=" size-12" />}
          name={"Products"}
          url={"/dashboard/product"}
        />

        <ModuleBtn
          icon={<HiComputerDesktop className=" size-12" />}
          name={"Sale"}
          url={"/dashboard/sale"}
        />

        <ModuleBtn
          icon={<HiDatabase className=" size-12" />}
          name={"Voucher"}
          url={"/dashboard/voucher"}
        />
        <ModuleBtn
          icon={<HiUser className=" size-12" />}
          name={"User Profile"}
          url={"/dashboard/user-profile"}
        />
      </div>
      <button
        onClick={handleLogoutBtn}
        className=" border-2 border-blue-500 font-semibold text-blue-600 hover:bg-blue-500 hover:text-stone-50 duration-200  text-sm rounded self-end px-7 py-2"
      >
        Logout
      </button>
    </ContainerSection>
  );
};

export default DashboardPage;
