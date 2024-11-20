import React from "react";
import ContainerSection from "./ContainerSection";
import userPlaceholder from "../assets/user-placeholder.png";
import useUserDataStore from "../store/useUserDataStore";

const Header = () => {
  const {
    userStore: { name, email, profile_image },
  } = useUserDataStore();

  return (
    <header className=" pt-5 pb-3.5 print:hidden">
      <ContainerSection>
        <div className=" flex justify-between items-center">
          <div>
            <h1 className=" text-2xl font-bold">Voucher App</h1>
            <h3 className=" text-xl font-bold text-stone-600">MMS Software</h3>
          </div>
          <div className=" flex items-center gap-3">
            <img
              src={profile_image ? profile_image : userPlaceholder}
              alt="user-image"
              className=" size-10 border-stone-50 rounded-full object-cover object-top"
            />
            <div className=" font-semibold">
              <h4 className=" text-stone-800">{name}</h4>
              <h5 className=" text-sm text-stone-500">{email}</h5>
            </div>
          </div>
        </div>
      </ContainerSection>
    </header>
  );
};

export default Header;
