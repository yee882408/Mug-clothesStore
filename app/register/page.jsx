"use client";

import { registerValidate } from "@utils/validate";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
const page = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: { email: "", username: "", password: "", cpassword: "" },
    validate: registerValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    const { username, email, password } = values;

    await axios
      .post("/api/user", { username, email, password })
      .then((res) => {
        toast.success("註冊成功");
      })
      .catch((err) => {
        toast.error("此使用者已註冊過，請直接登入");
      });
    router.push("/login");
  }

  return (
    <div className="flex-center flex-col bg-white mt-10 rounded-lg ">
      <div className="title text-center">
        <h1 className="text-grey-800 text-4xl font-bold py-4">註冊帳號</h1>
        <p className="w-3/4 mx-auto text-grey-400"></p>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col mt-2 gap-2">
        <input
          type="text"
          name="email"
          placeholder="電子信箱"
          className={`register-input ${
            formik.errors.email && formik.touched.email
              ? "border-red-500"
              : "border-zinc-400"
          }`}
          {...formik.getFieldProps("email")}
        />
        {formik.errors.email && formik.touched.email && (
          <span className="text-rose-500 text-sm">{formik.errors.email}</span>
        )}

        <input
          type="text"
          name="username"
          placeholder="使用者名稱"
          className={`register-input ${
            formik.errors.username && formik.touched.username
              ? "border-red-500"
              : "border-zinc-400"
          }`}
          {...formik.getFieldProps("username")}
        />
        {formik.errors.username && formik.touched.username ? (
          <span className="text-rose-500 text-sm">
            {formik.errors.username}
          </span>
        ) : (
          <></>
        )}

        <input
          type="password"
          name="password"
          placeholder="密碼"
          className={`register-input ${
            formik.errors.password && formik.touched.password
              ? "border-red-500"
              : "border-zinc-400"
          }`}
          {...formik.getFieldProps("password")}
        />
        {formik.errors.password && formik.touched.password && (
          <span className="text-rose-500 text-sm">
            {formik.errors.password}
          </span>
        )}
        <input
          type="password"
          name="cpassword"
          placeholder="確認密碼"
          className={`register-input ${
            formik.errors.cpassword && formik.touched.cpassword
              ? "border-red-500"
              : "border-zinc-400"
          }`}
          {...formik.getFieldProps("cpassword")}
        />
        {formik.errors.cpassword && formik.touched.cpassword && (
          <span className="text-rose-500 text-sm">
            {formik.errors.cpassword}
          </span>
        )}
        <button
          type="submit"
          className="w-full rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter mt-4"
        >
          註冊帳號
        </button>
        <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="flex mb-4 flex-center">
          <h1 className="mr-2">已有帳號嗎?</h1>
          <Link
            href={"/login"}
            className="text-indigo-700 font-bold underline underline-offset-8"
          >
            登入帳號
          </Link>
        </div>
      </form>
    </div>
  );
};

export default page;
