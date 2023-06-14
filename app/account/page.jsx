"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, useSession, getProviders, signOut } from "next-auth/react";
import Member from "@components/Member";
import Order from "@components/Order";
import axios from "axios";
import Spinner from "@components/Spinner";
import Provider from "@components/Provider";
import { toast } from "react-hot-toast";

const page = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(1);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const session = await getSession();
      const res = await getProviders();
      setProviders(res);
      setIsLoading(false);
      if (!session?.user.id) {
        router.push("/login");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      const res = await getProviders();
      setProviders(res);
      if (session?.user.id) {
        axios
          .post("/api/order", { userId: session.user.id })
          .then((response) => {
            setOrderList(response.data);
            setIsLoading(false);
          });
      } else {
        setOrderList([]);
        router.push("/login");
      }
    })();
  }, []);

  async function handleSignOut() {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    if (data.ok) {
      router.push(data.url);
      toast.success("登出成功");
    } else {
      window.location.replace("/");
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="flex flex-col m-auto px-2 sm:px-4 md:px-10 xl:px-52 my-10">
          <div className="mb-2">
            {session?.user ? (
              <>
                {providers && (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="cursor-pointer mr-5  hover:underline hover:underline-offset-4"
                  >
                    登出
                  </button>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full flex border-t ">
            {active === 1 ? (
              <div className="w-1/2 bg-white cursor-pointer text-center border-x">
                會員資訊
              </div>
            ) : (
              <div
                className="w-1/2 bg-gray-100 text-gray-500 cursor-pointer text-center border-b border-r"
                onClick={() => setActive(1)}
              >
                會員資訊
              </div>
            )}
            {active === 2 ? (
              <div className="w-1/2 bg-white cursor-pointer text-center border-x">
                訂單管理
              </div>
            ) : (
              <div
                className="w-1/2 bg-gray-100 text-gray-500 cursor-pointer text-center border-b border-r"
                onClick={() => setActive(2)}
              >
                訂單管理
              </div>
            )}
          </div>
          {active === 1 ? <Member session={session} /> : null}
          {active === 2 ? <Order orderList={orderList} /> : null}
        </div>
      )}
    </>
  );
};

export default page;
