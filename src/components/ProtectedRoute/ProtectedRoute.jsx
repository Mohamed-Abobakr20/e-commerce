import React from "react";
import Style from "./ProtectedRoute.module.scss";
import { Navigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function ProtectedRoute(props) {
  if (localStorage.getItem("token") !== null) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
