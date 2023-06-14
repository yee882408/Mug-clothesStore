import React from "react";
import pay from "../public/pay.jpeg";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const Bottom = (props) => {
  return (
    <div className=" flex-shrink-0 mt-auto flex-center flex-col w-full  text-gray-300 bg-black opacity-90 p-4 flex-wrap gap-3">
      <div className="flex gap-3">
        <div className="hover:text-white">
          <Link href="/">聯絡我們</Link>
        </div>
        <div className="hover:text-white">
          <Link href="/">退貨退款政策</Link>
        </div>
        <div className="hover:text-white">
          <Link href="/">人才招募</Link>
        </div>
      </div>
      <div className="flex gap-3">
        <h1>此網頁僅為練習使用。</h1>
      </div>
      <div className="flex gap-3 flex-col md:flex-row">
        <h1>© Mug. All rights reserved.</h1>
        <Image src={pay} width={230} alt="payment" priority={true}></Image>
      </div>
    </div>
  );
};

export default Bottom;
