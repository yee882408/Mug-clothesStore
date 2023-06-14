"use client";
import { CartContext } from "@components/CartContext";
import ProdList from "@components/Product/ProdList";
import Spinner from "@components/Spinner";
import axios from "axios";
import { debounce } from "lodash";
import React, { useCallback, useContext, useEffect, useState } from "react";

const page = () => {
  const { searchEl } = useContext(CartContext);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);

  useEffect(() => {
    if (searchEl.length > 0) {
      setIsLoading(true);
      debouncedSearch(searchEl);
    } else {
      setSearchResult([]);
    }
  }, [searchEl]);

  function searchProducts(searchEl) {
    const title = searchEl;
    axios
      .get(`/api/product?title=${title}`, { params: { title } })
      .then((res) => {
        setSearchResult(res.data);
        setIsLoading(false);
      });
  }

  return (
    <>
      {!searchEl && !isLoading && searchResult.length === 0 && (
        <div className="flex-center flex-col mt-2">
          <h2 className=" font-medium sm:text-2xl text-xl tracking-wider">
            請在搜尋欄輸入您想尋找的產品
          </h2>
        </div>
      )}
      {!isLoading && searchEl !== "" && searchResult.length === 0 && (
        <div className="flex-center flex-col mt-2">
          <h2 className=" font-medium sm:text-2xl text-xl tracking-wider">
            共找到{searchResult.length}項"{searchEl}"相關的產品
          </h2>
        </div>
      )}
      {isLoading && <Spinner />}
      {!isLoading && searchResult.length > 0 && (
        <div className="flex-center flex-col mt-2">
          <div>
            <h2 className=" font-medium sm:text-2xl text-xl tracking-wider">
              共找到{searchResult.length}項「{searchEl}」相關的產品
            </h2>
          </div>
          <ProdList cate={searchResult} />
        </div>
      )}
    </>
  );
};

export default page;
