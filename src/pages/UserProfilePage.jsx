import React from "react";
import ContainerSection from "../components/ContainerSection";
import Breadcrumb from "../components/Breadcrumb";
import userPlaceholder from "../assets/user-placeholder.png";
import { Link } from "react-router-dom";
import { HiPencilSquare } from "react-icons/hi2";
import useUserDataStore from "../store/useUserDataStore";

const UserProfilePage = () => {
  const {
    userStore: { name, email, profile_image },
  } = useUserDataStore();

  return (
    <ContainerSection>
      <Breadcrumb currentPageTitle={"User Profile"} />
      <div className=" border p-8 shadow-sm">
        <div className=" flex flex-col gap-2 w-1/4">
          <div className=" relative">
            <img
              src={profile_image ? profile_image : userPlaceholder}
              alt="user-image"
              className=" size-28 rounded border-stone-50"
            />
            <Link
              to={"/dashboard/user-profile/change-profile-image"}
              className=" absolute bottom-0 right-1/2 transform translate-x-2 translate-y-2 size-6 flex items-center justify-center border bg-blue-500 border-stone-50 rounded"
            >
              <HiPencilSquare className=" text-stone-50 size-3" />
            </Link>
          </div>
          <div className="font-semibold ">
            <p className="text-stone-800 ">Name</p>
            <div className=" flex gap-5 items-center">
              <p className=" text-sm text-stone-600">{name}</p>
              <Link
                to={"/dashboard/user-profile/change-name"}
                className=" size-6 flex justify-center items-center rounded border border-blue-500 bg-blue-500"
              >
                <HiPencilSquare className=" text-white size-3" />
              </Link>
            </div>
          </div>
          <div className="font-semibold ">
            <p className="text-stone-800">Email Address</p>
            <p className=" text-sm text-stone-600">{email}</p>
          </div>
          <Link
            to={"/dashboard/user-profile/change-password"}
            className=" border border-blue-500 text-stone-50 bg-blue-500 rounded flex justify-center items-center py-1 mt-2"
          >
            Change Password
          </Link>
        </div>
      </div>
    </ContainerSection>
  );
};

export default UserProfilePage;
