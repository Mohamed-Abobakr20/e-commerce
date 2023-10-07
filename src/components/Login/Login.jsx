import React, { useContext, useState } from "react";
import jwtDecode from "jwt-decode";
import Style from "./Login.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken, setUserData } = useContext(UserContext);
  const { getLoggedUserCart } = useContext(CartContext);

  async function loginSubmit(values) {
    setIsLoading(true);
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("hostname", window.location.hostname);
      localStorage.setItem("data", JSON.stringify(data.user));
      setUserToken(data.token);
      setUserData(data.user);
      navigate("/");
      await getLoggedUserCart();
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("This field is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("This field is required")
      .matches(/^[A-Z][a-z0-9]{4,}$/i, "Enter a valid password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <div className="login py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      {error ? (
        <div className="alert alert-danger mb-3 p-2 text-center">{error}</div>
      ) : null}
      <h2 className="mb-4">Login Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="email" className="mb-1">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="password" className="mb-1">
            Password:
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="d-flex mt-4 justify-content-center align-items-center">
          {!isLoading ? (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white w-25">
              Login
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </button>
          )}
          <NavLink className="btn text-main" to="/forgetpassword">
            Forget Password... ?
          </NavLink>
        </div>
      </form>
    </div>
  );
}
