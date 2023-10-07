import React, { useContext } from "react";
import Style from "./Navbar.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../Assets/images/freshcart-logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { userToken, setUserToken, setUserData } = useContext(UserContext);
  const { cartNum } = useContext(CartContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("hostname");
    localStorage.removeItem("data");
    setUserToken(null);
    setUserData(null);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-main-light fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src={Logo} alt="fresh cart" />
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          {userToken !== null ? (
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">
                  Brands
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/wishlist">
                  Wishlist
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/allorders">
                  Orders
                </NavLink>
              </li>
            </ul>
          ) : (
            ""
          )}

          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {userToken !== null ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link d-flex align-items-center position-relative"
                    to="/cart">
                    <span className="badge position-absolute end-0 top-0 bg-main text-white">
                      {cartNum}
                    </span>
                    <i className="fas fa-cart-shopping me-2 fs-4 text-black"></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span onClick={logout} className="nav-link cursor-pointer">
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
