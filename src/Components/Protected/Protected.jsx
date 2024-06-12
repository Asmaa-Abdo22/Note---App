import React from "react";
import { Navigate } from "react-router-dom";
export default function Protected({children}) {
  if (localStorage.getItem("token") == null) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
