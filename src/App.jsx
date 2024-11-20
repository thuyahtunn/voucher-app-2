import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";
import ProductPage from "./pages/ProductPage";
import SalePage from "./pages/SalePage";
import VoucherPage from "./pages/VoucherPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfileChangeNamePage from "./pages/UserProfileChangeNamePage";
import UserProfileChangeImagePage from "./pages/UserProfileChangeImagePage";
import UserProfileChangePasswordPage from "./pages/UserProfileChangePasswordPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import VoucherDetailPage from "./pages/VoucherDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="dashboard" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="product">
            <Route index element={<ProductPage />} />
            <Route path="create" element={<CreateProductPage />} />
            <Route path="edit/:id" element={<EditProductPage />} />
          </Route>
          <Route path="sale" element={<SalePage />} />
          <Route path="voucher" element={<VoucherPage />} />
          <Route path="voucher/detail/:id" element={<VoucherDetailPage />} />

          <Route path="user-profile">
            <Route index element={<UserProfilePage />} />
            <Route path="change-name" element={<UserProfileChangeNamePage />} />
            <Route
              path="change-profile-image"
              element={<UserProfileChangeImagePage />}
            />
            <Route
              path="change-password"
              element={<UserProfileChangePasswordPage />}
            />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
