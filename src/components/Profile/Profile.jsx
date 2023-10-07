import React, { useContext } from "react";
import Style from "./Profile.module.scss";
import jwtDecode from "jwt-decode";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context/UserContext";

export default function Profile() {
  const info = jwtDecode(localStorage.getItem("token"));
  const { userData } = useContext(UserContext);

  return (
    <div className=" profile p-4 my-5 bg-main-light text-start overflow-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
      <h3 className="my-4">
        Name : <span className="text-main">{info.name}</span>
      </h3>
      <h3 className="my-4">
        Email : <span className="text-main">{userData?.email}</span>
      </h3>
      <h3 className="my-4">
        Role : <span className="text-main">{info.role}</span>
      </h3>
    </div>
  );
}
