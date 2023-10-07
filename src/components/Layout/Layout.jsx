import React, { useContext, useEffect } from "react";
import Style from "./Layout.module.scss";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Offline } from "react-detect-offline";

export default function Layout() {
  const { setUserToken, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setUserToken(localStorage.getItem("token"));
      setUserData(JSON.parse(localStorage.getItem("data")));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container pt-5">
        <div className="position-fixed rounded-2 bottom-0 start-0 shadow bg-main text-white z-3 m-3">
          <Offline>
            <div className="p-3">
              <i className="fas fa-wifi me-2"></i>You Are Offline Now
            </div>
          </Offline>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
