import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [wishlist, setWishlist] = useState([]);

  function addWishClick(id) {
    if (!wishlist.includes(id)) {
      setWishlist([...wishlist, id]);
    }
  }

  function removeWishClick(id) {
    setWishlist(wishlist.filter((wish) => wish !== id));
  }

  function addToWishlist(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((response) => {
        addWishClick(productId);
        return response;
      })
      .catch((error) => error);
  }

  function getLoggedUserWishlist() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        setWishlist(
          response.data.data.map((product) => {
            return product.id;
          })
        );
        return response;
      })
      .catch((error) => error);
  }

  function removeProductWishlist(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((response) => {
        removeWishClick(id);
        return response;
      })
      .catch((error) => error);
  }


  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        addToWishlist,
        getLoggedUserWishlist,
        removeProductWishlist,
      }}>
      {props.children}
    </WishlistContext.Provider>
  );
}
