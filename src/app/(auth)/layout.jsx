import SuspenseWrapper from "@/utils/SuspenseWrapper";
import React from "react";

const AuthLayout = ({ children }) => {
  return <SuspenseWrapper>{children}</SuspenseWrapper>;
};

export default AuthLayout;
