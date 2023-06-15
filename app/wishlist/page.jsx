"use client";

import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProdList from "@components/Product/ProdList";
import Spinner from "@components/Spinner";

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [wishList, setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWishProduct();
    setIsLoading(false);
  }, [session]);

  // 將產品從願望清單移除的時候，把願望清單內的內容更新
  function removeFromWishlist(id) {
    setWishList((prev) => {
      return [...prev.filter((prod) => prod._id.toString() !== id)];
    });
  }
  async function getWishProduct() {
    if (session?.user.email) {
      await axios.get("/api/wishlist").then((response) => {
        setWishList(response.data.map((i) => i.product));
      });
    } else {
      setWishList([]);
      router.push("/login");
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="flex flex-col m-auto px-2 sm:px-4 md:px-10 xl:px-40 my-10">
          <div className="mb-2 flex-between text-2xl">
            <h1 className="tracking-wider">我的願望清單</h1>
            <div className="flex tracking-wider">
              <h1>共</h1>
              <h1 className="text-red-500">{wishList.length}</h1>
              <h1>件</h1>
            </div>
          </div>
          <hr className="border-black"></hr>
          <div className="bg-white  p-4 ">
            {!wishList.length && <h1>您尚未添加任何商品至願望清單</h1>}
            {wishList?.length > 0 && (
              <>
                <div className="flex-col">
                  <div className="flex-center flex-row">
                    <ProdList
                      cate={wishList}
                      removeFromWishlist={removeFromWishlist}
                    ></ProdList>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default page;
