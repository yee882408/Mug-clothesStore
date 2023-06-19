import React from "react";
import Image from "next/image";

import fp1 from "../public/fp1.jpg";
import fp2 from "../public/fp2.jpg";
import fp3 from "../public/fp3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/style.css";

import { Navigation, Pagination } from "swiper";

const Carousel = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        navigation={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className="my-custom-swiper-1"
        loop={true}
        slides-per-view={1}
      >
        <SwiperSlide className="my-custom-swiper-1">
          <Image src={fp1} alt="women clothes" priority={true}></Image>
        </SwiperSlide>
        <SwiperSlide className="my-custom-swiper-1">
          <Image src={fp2} alt="men clothes" priority={true}></Image>
        </SwiperSlide>
        <SwiperSlide className="my-custom-swiper-1">
          <Image src={fp3} alt="shoes" priority={true}></Image>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
