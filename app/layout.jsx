import "@styles/globals.css";
import Head from "next/head";
import Nav from "@/components/Nav";
import Bottom from "@components/Bottom";
import Provider from "@components/Provider";
import { CartContextProvider } from "@components/CartContext";
import { Noto_Sans_TC } from "next/font/google";
import { Toaster } from "react-hot-toast";

const noto_Sans_TC = Noto_Sans_TC({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Mug | 線上購物商城",
  description:
    "Mug是一家專注於男裝和女裝的時尚購物平台，您可以在這裡找到各種風格和價格範圍的選擇。在我們的網站上，您可以輕鬆地瀏覽和購買您喜愛的商品。我們提供直觀且易於使用的界面，讓您能輕鬆找到您想要的款式和尺寸。立即瀏覽我們的網站，發現最新的時尚趨勢和獨特的服飾選擇。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant-TW">
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js"></script>
        <link rel="icon" href="/icon.jpg" type="image" sizes="30" />
      </Head>
      <body className={noto_Sans_TC.className}>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "300px",
              padding: "16px 24px",
              backgroundColor: "white",
              color: "black",
            },
          }}
        />
        <Provider>
          <CartContextProvider>
            <div className="min-h-screen flex flex-col">
              <Nav></Nav>
              <main className="bg-white flex-grow">{children}</main>
              <Bottom></Bottom>
            </div>
          </CartContextProvider>
        </Provider>
      </body>
    </html>
  );
}
