"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { updateValidate } from "@utils/validate";
import axios from "axios";
import Spinner from "./Spinner";

const Member = ({ session }) => {
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },
    validate: updateValidate,
    onSubmit,
  });

  useEffect(() => {
    if (!session) return;
    axios.get(`/api/user`).then((res) => {
      formik.setValues({
        email: res.data.email,
        username: res.data.username,
      });
      setId(res.data._id);
      setIsLoading(false);
    });
  }, [session]);

  async function onSubmit(values) {
    const { username, email } = values;

    await axios
      .put("/api/user", { username, email, _id: id })
      .then((res) => {
        toast.success("更新用戶資料成功");
      })
      .catch((error) => {
        toast.error("更新用戶資料失敗");
      });
  }

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white border-x border-b  p-4 flex flex-col min-h-[800px]"
        >
          <h1 className=" font-bold text-center text-xl sm:text-2xl md:text-4xl"></h1>
          {session?.user && (
            <div className="flex flex-col gap-2">
              <div>
                <span>電子信箱</span>
                <input
                  type="text"
                  name="email"
                  placeholder="電子信箱"
                  disabled={true}
                  className={`w-full rounded-[7px] border border-zinc-400 bg-transparent 
             px-3 py-2.5 mt-2 font-sans text-sm font-normal  outline-0 transition-all 
              focus:border-slate-600 focus:outline-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-zinc-400"
              }`}
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email && (
                  <span className="text-rose-500 text-sm">
                    {formik.errors.email}
                  </span>
                )}
              </div>
              <div>
                <span>使用者名稱</span>
                <input
                  type="text"
                  name="username"
                  placeholder="使用者名稱"
                  className={`update-input ${
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
              </div>
              <button type="submit" className="member-btn">
                更新個人資料
              </button>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default Member;
