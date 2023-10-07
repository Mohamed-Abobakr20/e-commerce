import React from "react";
import Style from "./SubCategories.module.scss";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

export default function SubCategories() {
  const { id } = useParams();

  function getSubCategories(id) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }

  const { isLoading, isError, data, isFetching } = useQuery(
    "subCategories",
    () => getSubCategories(id)
  );

  return (
    <div className="vh-100 d-flex align-items-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Subcategories</title>
      </Helmet>
      {isLoading ? (
        <div className="position-fixed top-0 start-0  bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      <div className="row g-4 w-100">
        {data?.data.data && data?.data.data.length !== 0 ? (
          data?.data.data.map((subcategory) => {
            return (
              <div className="col-md-4" key={subcategory.name}>
                <div className="subcategory h-100 border rounded-3 overflow-hidden">
                  <h3 className="text-center text-main py-2">
                    {subcategory.name}
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <h2>There are no subcategories...</h2>
        )}
      </div>
    </div>
  );
}
