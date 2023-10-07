import React, { useState } from "react";
import Style from "./Register.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function registerSubmit(values) {
    setIsLoading(true);
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      navigate("/login");
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Min length is 3 chars")
      .max(20, "Max length is 16 chars")
      .required("This field is required"),
    email: Yup.string()
      .required("This field is required")
      .email("Enter a valid email"),
    phone: Yup.string()
      .required("This field is required")
      .matches(/^01[0125][0-9]{8}$/i, "Enter a valid phone number"),
    password: Yup.string()
      .required("This field is required")
      .matches(/^[A-Z][a-z0-9]{4,}$/i, "Enter a valid password"),
    rePassword: Yup.string()
      .required("This field is required")
      .oneOf([Yup.ref("password")], "Password and rePassword must be the same"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <div className="register py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      {error ? (
        <div className="alert alert-danger mb-3 p-2 text-center">{error}</div>
      ) : null}
      <h2 className="mb-4">Register Form</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name" className="mb-1">
            Name:
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.name}
            </div>
          ) : null}
        </div>
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
          <label htmlFor="phone" className="mb-1">
            Phone:
          </label>
          <input
            className="form-control"
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.phone}
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
        <div className="form-group mb-2">
          <label htmlFor="rePassword" className="mb-1">
            rePassword:
          </label>
          <input
            className="form-control"
            type="password"
            id="rePassword"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.rePassword}
            </div>
          ) : null}
        </div>
        {!isLoading ? (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white w-25 d-block mx-auto mt-4">
            Register
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white d-block mx-auto mt-4">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </button>
        )}
      </form>
    </div>
  );
}
