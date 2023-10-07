import React from "react";
import Style from "./ProtectedAuth.module.scss";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth(props) {
  if (localStorage.getItem("token") === null) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}
