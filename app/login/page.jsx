"use client";

import React from "react";
import Image from "next/image";

import G from "../../public/G.png";
import { useEffect, useState } from "react";

import { signIn, useSession, getProviders } from "next-auth/react";
import { useFormik } from "formik";
import { toast, useToasterStore } from "react-hot-toast";
import Link from "next/link";
import Spinner from "@components/Spinner";
import login_validate from "@utils/validate";
const Nav = () => {
  const { data: session } = useSession();
  const { toasts } = useToasterStore();
  const [providers, setProviders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 限制toast數量
  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: login_validate,
    onSubmit,
  });

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
      setIsLoading(false);
    })();
  }, []);

  async function onSubmit(values) {
    console.log(values);
    const data = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    if (data.error === "找不到該使用者") {
      toast.error("找不到該使用者，請註冊新帳號");
    } else if (data.error === "密碼錯誤") {
      toast.error("密碼輸入錯誤，請重新嘗試");
    } else {
      // 成功登入將用戶導向至主頁面
      window.location.replace("/");
    }
  }

  async function handleGoogleSignin() {
    const data = await signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="flex-center">
          <div className="w-96 flex-center flex-col bg-white mt-10 rounded-lg">
            <div className="title text-center">
              <h1 className="text-grey-800 text-4xl font-bold py-4">
                登入帳號
              </h1>
              <p className="w-3/4 mx-auto text-grey-400"></p>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col mt-2 gap-2"
            >
              <input
                type="text"
                name="email"
                placeholder="電子信箱"
                className="login-input"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email ? (
                <span className="text-rose-500 text-sm">
                  {formik.errors.email}
                </span>
              ) : (
                <></>
              )}
              <input
                type="password"
                name="password"
                placeholder="密碼"
                className="login-input"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password ? (
                <span className="text-rose-500 text-sm">
                  {formik.errors.password}
                </span>
              ) : (
                <></>
              )}
              <button type="submit" className="login-btn">
                登入帳號
              </button>
              <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            </form>

            {!session?.user && (
              <div>
                {providers && (
                  <button type="button" onClick={handleGoogleSignin}>
                    <Image
                      src={G}
                      width={60}
                      height={60}
                      alt="google"
                      className="border border-zinc-400 rounded-full"
                    ></Image>
                  </button>
                )}
              </div>
            )}

            <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex mb-4">
              <h1 className="mr-2">還沒有帳號嗎?</h1>
              <Link
                href={"/register"}
                className="text-indigo-700 font-bold underline underline-offset-8"
              >
                註冊帳號
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
