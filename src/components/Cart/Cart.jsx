import React, { useContext, useState } from "react";
import Style from "./Cart.module.scss";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const [loading, setLoading] = useState(false);

  const { getLoggedUserCart, removeItem, updateQuantity, clearCart } =
    useContext(CartContext);

  async function getCart() {
    return await getLoggedUserCart();
  }

  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    "getCart",
    getCart
  );

  async function removeCartItem(id) {
    setLoading(true);
    const response = await removeItem(id);
    setLoading(false);

    if (response.data.status === "success") {
      refetch();
      toast.success("The item is removed.");
    } else {
      toast.error("The item is not removed.");
    }
  }

  async function clearAllCart() {
    setLoading(true);
    const response = await clearCart();
    setLoading(false);

    if (response.data.message === "success") {
      refetch();
      toast.success("The cart is clear.");
    } else {
      toast.error("The cart is not clear.");
    }
  }

  async function updateQuantityItem(id, count) {
    setLoading(true);
    const response = await updateQuantity(id, count);
    setLoading(false);

    if (response.data.status === "success") {
      refetch();
      toast.success("The item count is updated.");
    } else {
      toast.error("The item count is not updated.");
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      {isLoading || loading ? (
        <div className="position-fixed top-0 start-0  bg-black bg-opacity-75 w-100 h-100 z-2 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fs-1 text-main"></i>
        </div>
      ) : null}
      <div className="cart my-5 px-3 pt-3 bg-main-light">
        {data?.data !== undefined ? (
          <>
            <h4 className="text-main">
              Number Of Items : {data?.data.numOfCartItems}
            </h4>
            <h5 className="text-main">
              Total Cart Price: {data?.data.data.totalCartPrice} EGP
            </h5>
            <div className="d-flex justify-content-between align-items-center">
              <button
                onClick={() => clearAllCart()}
                className="btn btn-sm bg-main text-white my-2">
                <i className="fas fa-trash me-2"></i>Clear Cart
              </button>
              <NavLink
                to={'/checkout'}
                className="btn btn-sm bg-main text-white my-2">
                <i className="fa-brands fa-cc-visa me-2"></i>Buy Online
              </NavLink>
            </div>
            <div className="items">
              {data?.data.data.products.map((product) => {
                return (
                  <div className="row py-3 border-bottom" key={product._id}>
                    <div className="col-9">
                      <div className="row">
                        <div className="col-2">
                          <img
                            className="w-100"
                            src={product.product.imageCover}
                            alt={product.product.id}
                          />
                        </div>
                        <div className="col-10 d-flex justify-content-center flex-column">
                          <h6 className="fw-bold">
                            {product.product.title
                              .split(" ")
                              .slice(0, 4)
                              .join(" ")}
                          </h6>
                          <p className="text-main fw-bold">
                            Price : {product.price}
                          </p>
                          <button
                            onClick={() => {
                              removeCartItem(product.product.id);
                            }}
                            className="btn btn-sm bg-main text-white"
                            style={{ width: 100 }}>
                            <i className="fas fa-trash me-2"></i>Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-end">
                      <button
                        onClick={() => {
                          updateQuantityItem(
                            product.product.id,
                            product.count + 1
                          );
                        }}
                        className="btn btn-sm bg-main text-white fw-bold fs-6">
                        +
                      </button>
                      <span className="mx-2 d-inline-block">
                        {product.count}
                      </span>
                      <button
                        disabled={product.count === 1}
                        onClick={() => {
                          updateQuantityItem(
                            product.product.id,
                            product.count - 1
                          );
                        }}
                        className="btn btn-sm bg-main text-white fw-bold fs-6">
                        -
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="vh-100 d-flex align-items-center justify-content-center">
            <h2>There are no itmes.</h2>
          </div>
        )}
      </div>
    </>
  );
}
