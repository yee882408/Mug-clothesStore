import React, { useContext } from "react";
import ProdCard from "./ProdCard";
import AddCart from "../Modal/AddCart";
import { CartContext } from "../CartContext";

const ProdList = (props) => {
  const { addCart } = useContext(CartContext);

  return (
    <>
      <ProdCard
        products={props.cate}
        removeFromWishlist={props.removeFromWishlist}
      ></ProdCard>
      {addCart && <AddCart />}
    </>
  );
};

export default ProdList;
