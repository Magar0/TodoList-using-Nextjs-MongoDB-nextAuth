import SuspenseWrapper from "@/utils/SuspenseWrapper";
import React from "react";

const LoginLayout = ({ children }) => {
  return <SuspenseWrapper>{children}</SuspenseWrapper>;
};

export default LoginLayout;
