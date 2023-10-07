import React from "react";
import Style from "./CategorySlider.module.scss";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { isLoading, isError, data, isFetching } = useQuery(
    "categoriesImages",
    getCategories
  );

  const details = data ? data.data.data : null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <div className="position-fixed top-0 start-0  bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      {details ? (
        <Slider {...settings} className="mb-5">
          {details.map((category, index) => {
            return (
              <img
                key={index}
                src={category.image}
                alt={category.name}
                className="w-100 small-img"
              />
            );
          })}
        </Slider>
      ) : null}
    </>
  );
}
