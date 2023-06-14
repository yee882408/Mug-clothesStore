"use client";

import React, { useEffect, useState, useContext } from "react";

import ProdList from "@components/Product/ProdList";
import axios from "axios";
import Spinner from "@components/Spinner";

import { CartContext } from "@components/CartContext";
import Sort from "@components/Sort";

const page = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedSort, sort, handleSortChange } = useContext(CartContext);

  useEffect(() => {
    axios.get(`/api/men?sortby=${sort}`).then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }, [selectedSort]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="flex-col">
          <div className="flex-center m-6">
            <h1 className="text-4xl underline underline-offset-8">男裝首頁</h1>
          </div>

          <div className="flex-center flex-row">
            <div className="flex flex-col">
              <Sort
                selectedSort={selectedSort}
                onSortChange={handleSortChange}
              />
              <ProdList cate={products}></ProdList>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
