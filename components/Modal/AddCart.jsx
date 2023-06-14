import React, { useCallback, useContext, useEffect, useRef } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { CartContext } from "@components/CartContext";

const AddCart = () => {
  const { setAddCart } = useContext(CartContext);

  const modalWrapperRef = useRef();

  // 檢查使用者是點擊到modal或backdrop
  // 使用useCallback讓removeEventListener可以在關閉modal正確得到backDropHandler
  const backDropHandler = useCallback((e) => {
    if (!modalWrapperRef?.current?.contains(e.target)) {
      setAddCart(false);
    }
  }, []);

  // 設置setTimeOut避免modal開啟前執行backDropHandler
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", backDropHandler);
    });
  }, []);

  // modal關閉後移除backDropHandler
  useEffect(() => {
    return () => window.removeEventListener("click", backDropHandler);
  }, []);

  return (
    <div className="flex flex-center fixed inset-0 bg-black bg-opacity-50 z-50">
      <div
        className="bg-white flex flex-col flex-center p-4 rounded-md"
        ref={modalWrapperRef}
      >
        <div className="flex-center flex-col mb-2">
          <CheckIcon className=" w-10 h-10 text-green-500 border-2 border-green-500 rounded-full mb-2" />
          <h1>已將商品加入購物車</h1>
        </div>
        <h1>請至購物車結帳</h1>
      </div>
    </div>
  );
};

export default AddCart;
