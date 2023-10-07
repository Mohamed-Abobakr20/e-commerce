import React from "react";
import Style from "./Brands.module.scss";
import axios from "axios";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  const { isLoading, isError, data, isFetching } = useQuery(
    "categoriesImages",
    getBrands
  );

  const brands = data ? data.data.data : null;

  return (
    <div className="brands py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
      </Helmet>
      {isLoading ? (
        <div className="position-fixed top-0 start-0  bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      <div className="row g-4">
        {brands
          ? brands.map((brand) => {
              return (
                <div className="col-md-3" key={brand.name}>
                  <div className="brand border rounded-3 overflow-hidden">
                    <img className="w-100" src={brand.image} alt={brand.name} />
                    <h3 className="text-center text-main">{brand.name}</h3>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
