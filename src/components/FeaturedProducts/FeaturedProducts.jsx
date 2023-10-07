import React, { useContext, useEffect, useState } from "react";
import Style from "./FeaturedProducts.module.scss";
import axios from "axios";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";

export default function FeaturedProducts() {
  const { addToCart } = useContext(CartContext);
  const {
    addToWishlist,
    wishlist,
    getLoggedUserWishlist,
    removeProductWishlist,
  } = useContext(WishlistContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function removeWishlistItem(id) {
    setLoading(true);
    const response = await removeProductWishlist(id);
    setLoading(false);

    if (response.data.status === "success") {
      toast.success("The item is removed from wishlist.");
    } else {
      toast.error("The item is not removed from wishlist.");
    }
  }

  async function addProductToCart(id) {
    setLoading(true);
    const response = await addToCart(id);
    setLoading(false);

    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error("Product not added successfully to your cart");
    }

    if (wishlist.includes(id)) {
      removeWishlistItem(id);
    }
  }

  async function addProductToWishlist(id) {
    setLoading(true);
    const response = await addToWishlist(id);
    setLoading(false);

    if (response.data.status === "success") {
      toast.success(response.data.message);
    } else {
      toast.error("Product not added successfully to your wishlist");
    }
  }

  function getFeaturedProducts(page) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    );
  }

  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["featuredProducts", page],
    queryFn: () => getFeaturedProducts(page),
  });

  function reFetch(num) {
    setPage(num);
    refetch();
  }

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <>
      {isLoading || loading ? (
        <div className="position-fixed top-0 start-0 bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      <div className="row g-3">
        <h2 className="mt-5 mb-2">All Products</h2>
        {data?.data.data.map((product) => {
          return (
            <div key={product.id} className="col-lg-2 col-md-4 col-sm-6">
              <div className="product p-2 position-relative">
                <NavLink to={`/productdetails/${product.id}`}>
                  <img
                    className="w-100"
                    src={product.imageCover}
                    alt={product.title.split(" ").slice(0, 2).join(" ")}
                  />
                  <span className="text-main font-sm fw-bolder my-1 d-block">
                    {product.category.name}
                  </span>
                  <h3 className="h6 fw-bolder">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="my-3 d-flex justify-content-between align-items-center">
                    <span className="price">{product.price} EGP</span>
                    <span className="rate">
                      <i className="fas fa-star rating-color"></i>{" "}
                      {product.ratingsAverage}
                    </span>
                  </div>
                </NavLink>
                <div className="d-flex gap-3">
                  <button
                    onClick={() => addProductToCart(product.id)}
                    className="btn bg-main text-white btn-sm">
                    Add To Cart
                  </button>

                  <button
                    onClick={() => {
                      addProductToWishlist(product.id);
                    }}
                    className="btn text-white bg-main mx-auto btn-sm">
                    <i
                      className={`fa-${
                        wishlist.includes(product.id) ? "solid" : "regular"
                      } fa-heart`}></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <nav
        className="mt-3 nav d-flex align-items-center justify-content-center"
        aria-label="Page navigation">
        <ul className="pagination m-0">
          <li className="page-item mx-1">
            <button
              onClick={() => {
                reFetch(1);
              }}
              className="text-white bg-main btn border"
              disabled={page === 1}>
              1
            </button>
          </li>
          <li className="page-item mx-1">
            <button
              onClick={() => {
                reFetch(2);
              }}
              className="text-white bg-main btn border"
              disabled={page === 2}>
              2
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
