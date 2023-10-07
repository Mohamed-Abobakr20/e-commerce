import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartNum, setCartNum] = useState(0);
  const [cartId, setCartId] = useState(null);

  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((response) => {
        setCartNum(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setCartNum(response.data.numOfCartItems);
        setCartId(response.data.data._id);
        return response;
      })
      .catch((error) => error);
  }

  function removeItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setCartNum(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setCartNum(0);
        return response;
      })
      .catch((error) => error);
  }

  function updateQuantity(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function payOnline(id, url, values) {
    const body = {
      shippingAddress: values,
    };

    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,
        { body },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, [cartId]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeItem,
        updateQuantity,
        cartNum,
        payOnline,
        setCartNum,
        clearCart,
        cartId,
        setCartId,
      }}>
      {props.children}
    </CartContext.Provider>
  );
}
