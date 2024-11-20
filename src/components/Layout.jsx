import React, { useEffect } from "react";
import ContainerSection from "./ContainerSection";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import reactUseCookie from "react-use-cookie";
import useTokenStore from "../store/useTokenStore";
import useUserDataStore from "../store/useUserDataStore";

const Layout = () => {
  const [tokenCookie] = reactUseCookie("token");
  const { tokenStore } = useTokenStore();
  const { setUserStore } = useUserDataStore();
  const [userCookie] = reactUseCookie("user");

  if (!tokenCookie) {
    return <Navigate to={"/"} />;
  }
  const userObj = JSON.parse(userCookie);
  useEffect(() => {
    setUserStore(userObj);
  }, []);
  return (
    <section className=" flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </section>
  );
};

export default Layout;
