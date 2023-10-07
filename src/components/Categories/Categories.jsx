import React from "react";
import Style from "./Categories.module.scss";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { isLoading, isError, data, isFetching } = useQuery(
    "categoriesImages",
    getCategories
  );

  const categories = data ? data.data.data : null;

  return (
    <div className="brands py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      {isLoading ? (
        <div className="position-fixed top-0 start-0  bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      <div className="row g-4">
        {categories
          ? categories.map((category) => {
              return (
                <div className="col-md-3" key={category.name}>
                  <NavLink to={`/${category._id}/subcategories`}>
                    <div className="brand h-100 border rounded-3 overflow-hidden">
                      <img
                        className="w-100"
                        height={300}
                        src={category.image}
                        alt={category.name}
                      />
                      <h3 className="text-center text-main py-2">
                        {category.name}
                      </h3>
                    </div>
                  </NavLink>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
