"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@components/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ProdDetail from "@components/Product/ProdDetail";
import Spinner from "@components/Spinner";
import RelatedProd from "@components/RelatedProd";
import { toast, useToasterStore } from "react-hot-toast";
import AddCart from "@components/Modal/AddCart";
import Provider from "@components/Provider";
import ClientOnly from "@components/ClientOnly";

const page = ({ params }) => {
  const { id } = params;
  const { data: session } = useSession();
  const { addProduct, addCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wished, setWished] = useState();
  const router = useRouter();
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  useEffect(() => {
    axios.get(`/api/product/${id}`).then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session?.user.email) {
        await axios.get("/api/wishlist").then((response) => {
          const prod = response.data.map((i) => i.product);
          const prodId = prod.map((iii) => iii._id);
          const isExistedWishlist = prodId.includes(params.id);
          setWished(isExistedWishlist);
        });
      } else {
      }
    })();
  }, []);

  const addWish = async (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    await axios.post(`/api/wishlist`, {
      userEmail: session?.user.email || null,
      product: products._id,
    });

    if (session?.user.email) {
      await axios.get("/api/wishlist").then((response) => {
        const prod = response.data.map((i) => i.product);
        const prodId = prod.map((iii) => iii._id);
        const isExistedWishlist = prodId.includes(products._id);
        setWished(isExistedWishlist);
        if (isExistedWishlist) {
          toast.success("已成功加入願望清單");
        }
        if (isExistedWishlist === false) {
          toast.error("已從願望清單中移除");
        }
      });
    } else {
    }
  };

  function addToCart(prodId) {
    addProduct(prodId);
  }

  function buy(prodId) {
    addProduct(prodId);
    router.push("/cart");
  }

  return (
    <>
      {isLoading && <Spinner />}
      {addCart && <AddCart />}
      {!isLoading && (
        <>
          <ClientOnly>
            <Provider>
              <div
                // className="flex flex-col gap-4 px-10 items-center pt-10"
                className="flex flex-col m-auto px-2 sm:px-4 md:px-10 xl:px-52 my-10"
              >
                <div className="bg-white flex lg:flex-row flex-col lg:gap-28 gap-10 mb-4 flex-center">
                  {/* left */}
                  <div className="flex">
                    <img
                      src={products.image}
                      alt="product image"
                      className="w-80 h-80 object-cover flex"
                    />
                  </div>
                  {/* right */}
                  <div className="flex flex-col min-w-[300px] p-4">
                    <h1 className="font-bold text-4xl mt-4 mb-4">
                      {products.title}
                    </h1>
                    <h1 className="font-bold mt-4 mb-4">【商品描述】</h1>
                    <h1> {products.description}</h1>
                    <div className="mt-4 font-semibold text-xl">
                      <h1> NT${products.price}</h1>
                    </div>
                    <div className="mt-4 flex flex-center">
                      <button
                        onClick={() => {
                          addToCart(products._id);
                        }}
                        className="single-product-btn"
                      >
                        加入購物車
                      </button>
                      <button
                        onClick={() => {
                          buy(products._id);
                        }}
                        className="single-product-btn"
                      >
                        立即購買
                      </button>
                    </div>
                    <div className="flex-center mt-2">
                      {session?.user.id && (
                        <button
                          onClick={addWish}
                          className="p-2 cursor-pointer z-20 "
                        >
                          {wished ? (
                            <>
                              <FavoriteIcon className="text-red-500" />
                              <span className="text-sm">加入願望清單</span>
                            </>
                          ) : (
                            <>
                              <FavoriteBorderOutlinedIcon />
                              <span className="text-sm">已加入願望清單</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <ProdDetail prodId={id} />
              <RelatedProd product={products} />
            </Provider>
          </ClientOnly>
        </>
      )}
    </>
  );
};

export default page;
