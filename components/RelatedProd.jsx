"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import Spinner from "./Spinner";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/relatedProd.css";
import { register } from "swiper/element/bundle";

// import function to register Swiper custom elements

register();

const RelatedProd = ({ product }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if (product.category === "men") {
    useEffect(() => {
      axios.get(`/api/men`).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    }, []);
  }

  if (product.category === "women") {
    useEffect(() => {
      axios.get(`/api/women`).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    }, []);
  }

  if (product.category === "hot") {
    useEffect(() => {
      axios.get(`/api/hot`).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    }, []);
  }

  if (product.category === "feature") {
    useEffect(() => {
      axios.get(`/api/feature`).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    }, []);
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="lg:mx-28 mx-10 mb-10">
          <h1 className="text-3xl font-semibold mb-4">相關商品</h1>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            freeMode={true}
            className="myswiper2"
            breakpoints={{
              500: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product._id}>
                <a href={`/product/${product._id}`} className="flex-1">
                  <div className="w-full mx-auto border rounded-md overflow-hidden shadow-md mb-10">
                    <img
                      src={product.image}
                      alt="women clothes"
                      className="block w-full h-48 object-cover select-none"
                    />
                    <div className="px-4 py-3">
                      <h2 className="text-lg font-medium select-none">
                        {product.title}
                      </h2>
                      <h2> NT${product.price}</h2>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default RelatedProd;
