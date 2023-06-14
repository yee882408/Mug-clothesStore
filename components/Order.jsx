import Link from "next/link";
import React from "react";

const Order = ({ orderList }) => {
  return (
    <div className="bg-white border-x border-b p-4 min-h-[800px]">
      {!orderList.length && <h1>您尚未訂購任何商品</h1>}
      {orderList?.length > 0 && (
        <>
          <div className="grid grid-rows-1 grid-cols-10 bg-slate-200 p-2">
            <div className="col-span-3">商品資訊</div>
            <div className="col-span-2 text-center">單件價格</div>
            <div className="col-span-2 text-center">數量</div>
            <div className="col-span-1 text-center">小計</div>
            <div className="col-span-2 text-center">交易狀態</div>
          </div>

          {orderList.map((order) => (
            <div key={order._id} className="mt-4">
              <h1 className="border-b bg-slate-400 p-2">
                訂單編號:{order._id}
              </h1>
              {order.orderItem.map((info) => (
                <Link href={`/product/${info.url}`} key={info.image}>
                  <div className="grid grid-cols-10 border-b p-2">
                    <div className="col-span-3 flex items-center">
                      <img
                        src={info.image}
                        className="w-16 h-16 hidden md:flex"
                      ></img>

                      <span className="ml-2">
                        {info.price_data.product_data.name}
                      </span>
                    </div>
                    <div className="col-span-2 flex flex-center">
                      <span>
                        NT${info.price_data.totalPrice / info.quantity}
                      </span>
                    </div>
                    <div className="col-span-2 flex flex-center">
                      <span>x{info.quantity}</span>
                    </div>
                    <div className="col-span-1 flex flex-center">
                      <span>NT${info.price_data.totalPrice}</span>
                    </div>
                    <div className="col-span-2 flex flex-center"></div>
                  </div>
                </Link>
              ))}
              <div className="bg-white border-b p-4 flex">
                <div className="w-full flex-start mt-1 flex-col">
                  <h1>收件人姓名:{order.name}</h1>
                  <h1>電話號碼:{order.phone}</h1>
                  <h1>電子信箱:{order.email}</h1>
                  <h1>郵遞區號:{order.postCode}</h1>
                  <h1>收件地址:{order.address}</h1>
                </div>
              </div>
              <div className="bg-white border-b p-4 flex">
                <div className="ml-auto">
                  <div className="w-48 flex-between mt-1">
                    <span>小計:</span>
                    <span>NT${Number(order.totalProductPrice)}</span>
                  </div>
                  <div className="w-48 flex-between mt-1">
                    <span>折扣:</span>
                    <span className="text-red-500">
                      -NT${Number(order.totalDiscount)}
                    </span>
                  </div>
                  <div className="w-48 flex-between mt-1">
                    <span>運費:</span>
                    <span>NT$60</span>
                  </div>
                  <div className="w-48 flex-between mt-1">
                    <span className="font-bold">訂單金額:</span>
                    <span className="font-bold">
                      NT${Number(order.totalBillPrice) + 60}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Order;
