import React, { useRef } from "react";
import ContainerSection from "../components/ContainerSection";
import Breadcrumb from "../components/Breadcrumb";
import { HiCamera } from "react-icons/hi2";
import userPlaceholder from "../assets/user-placeholder.png";
import { apiUrl } from "../api/constant";
import reactUseCookie from "react-use-cookie";
import useUserDataStore from "../store/useUserDataStore";

const UserProfileChangeImagePage = () => {
  const fileInputRef = useRef(null);
  const [tokenCookie] = reactUseCookie("token");
  const [userCookie, setUserCookie] = reactUseCookie("user");
  const {
    userStore: { profile_image },
    setUserStore,
  } = useUserDataStore();
  const handleClickFileInput = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileInputOnChange = async () => {
    const formData = new FormData();
    formData.append("profile_image", fileInputRef.current.files[0]);
    const res = await fetch(`${apiUrl}/user-profile/change-profile-image`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${tokenCookie}`,
      },
    });
    const json = await res.json();
    if (res.ok) {
      setUserCookie(JSON.stringify(json.user));
      setUserStore(json.user);
    } else {
      console.log("something wrong");
    }
    fileInputRef.current.files = null;
  };
  return (
    <ContainerSection>
      <Breadcrumb
        currentPageTitle={"Change Image"}
        links={[
          { pathName: "/dashboard/user-profile", pageTitle: "User Profile" },
        ]}
      />
      <div className=" border p-8 shadow-sm flex justify-start">
        <form className=" flex flex-col w-3/5 items-start gap-5">
          <div className=" relative">
            <img
              src={profile_image ? profile_image : userPlaceholder}
              alt="user-image"
              className=" size-28 rounded border-stone-50"
            />
            <button
              onClick={handleClickFileInput}
              className=" absolute bottom-0 right-0 transform translate-x-2 translate-y-2 size-7 flex items-center justify-center border bg-blue-500 border-stone-50 rounded-full "
            >
              <HiCamera className=" text-stone-50 size-4 " />
            </button>
          </div>
          <input
            className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
            id="file_input"
            type="file"
            onChange={handleFileInputOnChange}
            ref={fileInputRef}
          />
        </form>
      </div>
    </ContainerSection>
  );
};

export default UserProfileChangeImagePage;
