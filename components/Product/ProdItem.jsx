"use client";

import React, { useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import { toast, useToasterStore } from "react-hot-toast";
import Link from "next/link";
import Button from "../Button";
import "../../styles/card.css";

const ProdItem = ({
  _id,
  title,
  price,
  image,
  removeFromWishlist = () => {},
}) => {
  const { addProduct } = useContext(CartContext);
  const { toasts } = useToasterStore();

  // 限制toast數量
  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  function addToCart() {
    addProduct(_id);
  }

  return (
    <>
      <div className="card-container">
        <div className="card-image">
          <Link href={`/product/${_id}`}>
            <img src={image} alt="Product item" className="img" />
          </Link>
        </div>
        <div className="card-desc">
          <h1>{title}</h1>
          <p>NT${price}</p>
          <Button onClick={addToCart}></Button>
        </div>
      </div>
    </>
  );
};

export default ProdItem;
