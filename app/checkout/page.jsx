"use client";

import React, { useContext, useEffect, useState } from "react";
import useInput from "@app/hooks/use-input";
import { CartContext } from "@components/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Spinner from "@components/Spinner";
import { toast, useToasterStore } from "react-hot-toast";

const page = () => {
  const { cartProducts, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [pressDiscountBtn, setPressDiscountBtn] = useState(false);
  const [totalBillPrice, setTotalBillPrice] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { data: session } = useSession();
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { _id: cartProducts }).then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  const submitOrder = async () => {
    setIsLoading(true);
    await axios
      .post("api/checkout", {
        cartProducts,
        userId: session?.user.id || name,
        name,
        email,
        phone,
        postCode,
        address,
        totalProductPrice,
        totalBillPrice,
        totalDiscount,
      })
      .then((response) => {
        clearCart();
        router.push("/complete");
      });
  };

  const {
    input: name,
    inputIsValid: nameIsValid,
    inputIsInValid: nameIsInValid,
    inputHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
  } = useInput((value) => value.trim().length !== 0);

  const {
    input: email,
    inputIsValid: emailIsValid,
    inputIsInValid: emailIsInValid,
    inputHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput((value) => {
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return res.test(String(value).toLowerCase());
  });

  const {
    input: phone,
    inputIsValid: phoneIsValid,
    inputIsInValid: phoneIsInValid,
    inputHandler: phoneChangeHandler,
    blurHandler: phoneBlurHandler,
  } = useInput((value) => value.trim().length === 10);

  const {
    input: postCode,
    inputIsValid: postCodeIsValid,
    inputIsInValid: postCodeIsInValid,
    inputHandler: postCodeChangeHandler,
    blurHandler: postCodeBlurHandler,
  } = useInput((value) => value.trim().length === 3);

  const {
    input: address,
    inputIsValid: addressIsValid,
    inputIsInValid: addressIsInValid,
    inputHandler: addressChangeHandler,
    blurHandler: addressBlurHandler,
  } = useInput((value) => value.trim().length !== 0);

  const {
    input: coupon,
    inputIsValid: couponIsValid,
    inputIsInValid: couponIsInValid,
    inputHandler: couponChangeHandler,
    blurHandler: couponBlurHandler,
    reset: couponReset,
  } = useInput((value) => value === "10%off");

  useEffect(() => {
    let newTotal = 0;

    for (const productId of cartProducts) {
      const price = products.find((p) => p._id === productId)?.price || 0;
      newTotal += price;
    }

    setTotalBillPrice(newTotal);
    setTotalProductPrice(newTotal);

    if (pressDiscountBtn && couponIsValid) {
      setTotalBillPrice(totalBillPrice - totalBillPrice * (1 / 10));
    }
    if (pressDiscountBtn && couponIsInValid) {
      setTotalDiscount(0);
    }
  }, [cartProducts, products, pressDiscountBtn, totalDiscount]);

  const couponHandler = () => {
    setTotalDiscount(0);
    setPressDiscountBtn(true);

    if (couponIsValid) {
      setTotalDiscount(totalProductPrice * (1 / 10));
      toast.success("已成功使用優惠碼，請進行結帳");
      return;
    }
    if (couponIsInValid) {
      setTotalDiscount(0);
      toast.error("優惠碼輸入錯誤");
    }
  };

  let formIsValid = false;
  if (
    nameIsValid &&
    emailIsValid &&
    postCodeIsValid &&
    addressIsValid &&
    phoneIsValid
  ) {
    formIsValid = true;
  }

  return (
    <>
      <>
        <div className="flex flex-col gap-4 my-10 bg-center px-4 lg:px-52">
          {/* top */}
          {isLoading && <Spinner />}
          {!isLoading && (
            <>
              <div className="bg-white border-1">
                {!cartProducts.length && <h1>您尚未添加任何商品至購物車</h1>}
                {cartProducts?.length > 0 && (
                  <>
                    <h1 className="border-b-2 bg-slate-400 text-xl font-bold p-4">
                      購物車({cartProducts.length})件
                    </h1>
                    <div className="grid grid-rows-1 grid-cols-9 bg-slate-200 p-4">
                      <div className="col-span-3">商品名稱</div>
                      <div className="col-span-2 text-center">單件價格</div>
                      <div className="col-span-2 text-center">數量</div>
                      <div className="col-span-2 text-right">小計</div>
                    </div>
                    {products.map((prod) => (
                      <Link href={`/product/${prod._id}`} key={prod._id}>
                        <div
                          className="grid grid-cols-9 py-4 border-2 border-t-0 p-4"
                          key={prod._id}
                        >
                          <div className="col-span-3 flex items-center">
                            <img
                              src={prod.image}
                              className="w-16 h-16 hidden md:flex"
                            ></img>
                            <span className="md:ml-2">{prod.title}</span>
                          </div>
                          <div className="col-span-2 flex flex-center">
                            <span>NT${prod.price}</span>
                          </div>
                          <div className="col-span-2 flex flex-center">
                            {
                              cartProducts.filter((id) => id === prod._id)
                                .length
                            }
                          </div>
                          <div className="col-span-2 flex flex-end">
                            NT$
                            {cartProducts.filter((id) => id === prod._id)
                              .length * prod.price}
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="bg-white border-x-2 border-b-2 p-4 flex flex-col">
                      <div className="gap-2 mb-2 flex flex-col sm:flex-row">
                        <input
                          type="text"
                          name="coupon"
                          placeholder="優惠碼"
                          value={coupon}
                          onChange={couponChangeHandler}
                          onBlur={couponBlurHandler}
                          className="coupon-input"
                        />
                        <button
                          className="border border-[#f63b60] p-1 rounded-lg hover:bg-[#f63b60] transition-colors text-sm text-[#f63b60] hover:text-[#fff]"
                          onClick={couponHandler}
                        >
                          使用優惠碼
                        </button>
                      </div>
                      <div className="ml-auto">
                        <div className="w-48 flex-between ">
                          <span>小計:</span>
                          <span>NT${totalProductPrice}</span>
                        </div>
                        <div className="w-48 flex-between mt-1">
                          <span>折扣:</span>
                          <span>-NT${totalDiscount}</span>
                        </div>
                        <div className="w-48 flex-between mt-1">
                          <span>運費:</span>
                          <span>NT$60</span>
                        </div>
                        <div className="w-48 flex-between mt-1">
                          <span className="font-bold">總金額:</span>
                          <span className="font-bold">
                            NT${totalBillPrice + 60}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* bottom */}
              <div className="gap-2 xl:flex xl:flex-row flex-col">
                {/* left */}
                <div className="border-2 bg-white xl:w-1/2 w-full">
                  <h1 className="border-b-2 bg-slate-400 text-xl font-bold p-4">
                    收件資訊
                  </h1>
                  <div className="flex flex-col p-4">
                    <div className="mb-2">
                      <input
                        type="text"
                        value={name}
                        name="name"
                        placeholder="姓名"
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                        className="checkout-input"
                      />
                      {nameIsInValid && (
                        <div className="flex">
                          <p className="text-red-600 font-bold text-sm">
                            請輸入正確的名字
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        value={email}
                        name="email"
                        placeholder="電子信箱"
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        className="checkout-input"
                      />
                      {emailIsInValid && (
                        <p className="text-red-600 font-bold text-sm">
                          請輸入正確的信箱
                        </p>
                      )}
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        value={phone}
                        name="phone"
                        placeholder="電話號碼"
                        onChange={phoneChangeHandler}
                        onBlur={phoneBlurHandler}
                        className="checkout-input"
                      />
                      {phoneIsInValid && (
                        <p className="text-red-600 font-bold text-sm">
                          請輸入正確的電話號碼
                        </p>
                      )}
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        value={postCode}
                        name="postCode"
                        placeholder="郵遞區號"
                        onChange={postCodeChangeHandler}
                        onBlur={postCodeBlurHandler}
                        className="checkout-input"
                      />
                      {postCodeIsInValid && (
                        <p className="text-red-600 font-bold text-sm">
                          請輸入三碼郵遞區號
                        </p>
                      )}
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        value={address}
                        name="address"
                        placeholder="地址"
                        onChange={addressChangeHandler}
                        onBlur={addressBlurHandler}
                        className="checkout-input"
                      />
                      {addressIsInValid && (
                        <p className="text-red-600 font-bold text-sm">
                          請輸入正確的地址
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className="border-2 bg-white xl:w-1/2 w-full flex flex-col mt-2 xl:mt-0">
                  <h1 className="border-b-2 bg-slate-400 text-xl font-bold p-4">
                    付款資訊
                  </h1>
                  <div className="flex flex-col p-4">
                    <select
                      name="payment"
                      id="payment-type"
                      className="border border-black"
                    >
                      <option value="0">信用卡付款</option>
                      <option value="1">銀行轉帳(ATM)</option>
                    </select>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={submitOrder}
                      disabled={!formIsValid}
                      className="checkout-btn"
                    >
                      提交訂單
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    </>
  );
};

export default page;
