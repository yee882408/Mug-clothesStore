"use client";

import { CartContext } from "@components/CartContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Spinner from "@components/Spinner";
const page = () => {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isItemInCart, setIsItemInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { _id: cartProducts }).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
      setIsItemInCart(true);
    } else {
      setProducts([]);
      setIsItemInCart(false);
      setIsLoading(false);
    }
  }, [cartProducts]);

  const addItem = (prodId) => {
    addProduct(prodId);
  };
  const removeItem = (prodId) => {
    removeProduct(prodId);
  };

  let total = 0;

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:my-20 my-10 bg-center lg:px-52">
        {/* top */}
        {isLoading && <Spinner />}
        {!isLoading && (
          <>
            <div className="bg-white border-2 p-4">
              {!cartProducts.length && <h1>您尚未添加任何商品至購物車</h1>}
              {cartProducts?.length > 0 && (
                <>
                  <h1 className="border-b-2 bg-slate-400 text-xl font-bold p-2">
                    購物車({cartProducts.length})件
                  </h1>
                  <div className="grid grid-rows-1 grid-cols-10 bg-slate-200 p-2">
                    <div className="col-span-3">商品名稱</div>
                    <div className="col-span-2 text-center">單件價格</div>
                    <div className="col-span-2 text-center">數量</div>
                    <div className="col-span-2 text-center">小計</div>
                    <div className="col-span-1 text-center"></div>
                  </div>

                  {products.map((prod) => (
                    <div
                      className="grid grid-cols-10 py-4 border-2 border-t-0 p-2"
                      key={prod._id}
                    >
                      <div className="col-span-3 flex items-center">
                        <Link href={`/product/${prod._id}`}>
                          <img
                            src={prod.image}
                            className="w-16 h-16 hidden md:flex"
                          ></img>
                        </Link>
                        <span className="ml-2">{prod.title}</span>
                      </div>
                      <div className="col-span-2 flex flex-center">
                        <span>NT${prod.price}</span>
                      </div>
                      <div className="col-span-2 flex flex-center">
                        <div className="w-1/2 flex-center border flex-between">
                          <button
                            onClick={() => {
                              removeItem(prod._id);
                            }}
                            className=" text-black text-sm font-inter cursor-pointer w-8 h-8 border-r"
                          >
                            -
                          </button>
                          {cartProducts.filter((id) => id === prod._id).length}
                          <button
                            onClick={() => {
                              addItem(prod._id);
                            }}
                            className=" text-black text-sm font-inter cursor-pointer w-8 h-8 border-l"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 flex flex-center">
                        NT$
                        {cartProducts.filter((id) => id === prod._id).length *
                          prod.price}
                      </div>
                      <div className="col-span-1 flex flex-center"></div>
                    </div>
                  ))}
                </>
              )}
            </div>
            {/* bottom */}
            <div className="bg-white border-2 p-4">
              <div className="flex-end gap-4">
                <span>總金額:NT${total}</span>
                <Link href={"./checkout"}>
                  <button className="cart-btn" disabled={!isItemInCart}>
                    前往結帳
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default page;
