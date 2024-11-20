import React from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";

createRoot(document.querySelector("#root")).render(
  <BrowserRouter future={{ v7_startTransition: true }}>
    <App />
  </BrowserRouter>

  // <RouterProvider router={router} />
);
