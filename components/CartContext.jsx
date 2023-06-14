"use client";
import { createContext, useEffect, useRef, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  // 購物車、願望清單
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [addCart, setAddCart] = useState(false);
  // 搜尋
  const [searchEl, setSearchEl] = useState("");
  const [selectedSort, setSelectedSort] = useState("product_sort");
  const searchRef = useRef();
  // 排序
  const sort = selectedSort === "price_asc" ? "priceasc" : "pricedesc";

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    if (wishList?.length > 0) {
      ls?.setItem("wishList", JSON.stringify(wishList));
    }
  }, [wishList]);

  useEffect(() => {
    if (ls && ls.getItem("wishlist")) {
      setWishList(JSON.parse(ls.getItem("wishlist")));
    }
  }, []);

  useEffect(() => {
    if (addCart) {
      setTimeout(() => {
        setAddCart(false);
      }, 800);
    }
  }, [addCart]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
    setAddCart((prev) => !prev);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);

      if (prev.length === 1) ls.removeItem("cart");
      if (pos !== -1) {
        return prev.filter((_, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
    ls.removeItem("cart");
  }

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        wishList,
        addCart,
        setCartProducts,
        setAddCart,
        addProduct,
        removeProduct,
        clearCart,
        setSearchEl,
        searchEl,
        searchRef,
        selectedSort,
        sort,
        handleSortChange,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
