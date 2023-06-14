"use client";

import Carousel from "@components/Carousel";
import ProdList from "@components/Product/ProdList";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@components/Spinner";

export default function Home() {
  const [feature, setFeature] = useState([]);
  const [hot, setHot] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAll();
    setIsLoading(false);
  }, []);

  function fetchAll() {
    axios.get("/api/hot").then((response) => {
      setHot(response.data);
    });
    axios.get("/api/feature").then((response) => {
      setFeature(response.data);
    });
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="flex-col">
          <Carousel />
          <div className="flex-center m-6">
            <h1 className="text-4xl underline underline-offset-8">熱門產品</h1>
          </div>
          <div className="flex-center flex-row">
            <ProdList cate={hot}></ProdList>
          </div>
          <div className="flex-center m-6">
            <h1 className="text-4xl underline underline-offset-8">最新上市</h1>
          </div>
          <div className="flex-center flex-row">
            <ProdList cate={feature}></ProdList>
          </div>
        </div>
      )}
    </>
  );
}
