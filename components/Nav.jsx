"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { signOut, useSession, getProviders } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CartContext } from "./CartContext";

import logo from "../public/logo.jpg";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";

const Nav = () => {
  const { data: session } = useSession();
  const { cartProducts, setSearchEl, searchRef } = useContext(CartContext);
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [dropdown, setDropDown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  async function handleSignOut() {
    signOut();
  }

  const handleSearch = () => {
    router.push(`/search`);
  };

  return (
    <>
      <nav
        className={`flex flex-between w-full text-gray-300 bg-black py-4 lg:px-20 md:px-10 px-4 flex-wrap sticky top-0 z-50`}
      >
        {/* leftside */}
        <div className="flex-center gap-3 ">
          <Link href="/" className="flex-center ml-2">
            <Image
              src={logo}
              width={30}
              alt="Mug Logo"
              className="object-contain "
            ></Image>
          </Link>
          <div className="ml-6 md:flex hidden">
            <Link href="/" className="mr-5 hover:text-white">
              首頁
            </Link>
            <Link href="/product" className="mr-5 hover:text-white">
              所有產品
            </Link>
            <Link href="/men" className="mr-5 hover:text-white">
              男裝
            </Link>
            <Link href="/women" className="mr-5 hover:text-white">
              女裝
            </Link>
          </div>
        </div>

        {/* rightside */}
        <div className="flex flex-center">
          <div>
            <input
              type="text"
              ref={searchRef}
              placeholder="找尋什麼商品呢?"
              onChange={(e) => setSearchEl(e.target.value)}
              className="p-1 border border-gray-500 rounded-md focus:outline-none focus:border focus:border-gray-300 bg-transparent mr-1 transition-colors text-sm md:inline-block hidden"
            />
            <button
              onClick={handleSearch}
              className="mr-3 hover:text-white md:inline-block hidden"
            >
              <SearchIcon />
            </button>
          </div>
          {session?.user ? (
            <Link href="/account" className="mr-3 hover:text-white">
              <PersonOutlineIcon />
            </Link>
          ) : (
            <Link href="/login" className="mr-3 hover:text-white">
              <PersonOutlineIcon />
            </Link>
          )}
          {session?.user ? (
            <Link href="/wishlist" className="mr-3 hover:text-white">
              <FavoriteBorderIcon />
            </Link>
          ) : (
            <Link href="/login" className="mr-3 hover:text-white">
              <FavoriteBorderIcon />
            </Link>
          )}
          <Link href="/cart" className="mr-5 hover:text-white flex relative">
            <ShoppingCartIcon />
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 flex items-center justify-center bg-red-500 rounded-full text-white">
                <p className="text-xs font-medium">{cartProducts.length}</p>
              </div>
            </div>
          </Link>

          {/* dropdown  */}
          <button
            id="dropdownMenuIconHorizontalButton"
            onClick={() => {
              setDropDown((prev) => !prev);
            }}
            className="md:hidden flex "
            type="button"
          >
            <MenuIcon />
          </button>
          {dropdown && (
            <motion.div
              className="absolute right-0 top-12 overflow-hidden flex flex-center ml-6 flex-col bg-black w-full p-4 gap-2 z-50 md:hidden"
              initial={{ y: -10, opacity: 0 }}
              // whileInView={{ opacity: dropdown ? 1 : 0, y: dropdown ? 0 : -10 }}
              animate={{ opacity: dropdown ? 1 : 0, y: dropdown ? 0 : -10 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex w-full">
                <input
                  type="text"
                  ref={searchRef}
                  placeholder="找尋什麼商品呢?"
                  onChange={(e) => setSearchEl(e.target.value)}
                  className="p-1 border border-gray-500 rounded-md focus:outline-none focus:border focus:border-gray-300 bg-transparent mr-1 transition-colors text-sm flex-grow"
                />
                <button
                  onClick={handleSearch}
                  className="mr-3 hover:text-white ml-auto"
                >
                  <SearchIcon />
                </button>
              </div>
              <Link href="/" className="mr-5 hover:text-white">
                首頁
              </Link>
              <Link href="/product" className="mr-5 hover:text-white">
                所有產品
              </Link>
              <Link href="/men" className="mr-5 hover:text-white">
                男裝
              </Link>
              <Link href="/women" className="mr-5 hover:text-white">
                女裝
              </Link>
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
            </motion.div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
