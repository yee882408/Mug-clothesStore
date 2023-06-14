"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const backHomePage = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-4 my-20 m-auto md:px-52">
      <div className="bg-white md:border-2 p-4 h-96 flex flex-center flex-col">
        <h1 className=" font-bold text-center text-xl sm:text-2xl md:text-4xl">
          付款完成
          <br />
          感謝您的訂購
        </h1>
        <button
          onClick={backHomePage}
          className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter mt-10"
        >
          繼續購物
        </button>
      </div>
    </div>
  );
};

export default page;
