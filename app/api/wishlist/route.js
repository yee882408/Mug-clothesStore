import Wishlist from "@models/wishlist";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
  try {
    await connectToDB();
    const { user } = await getServerSession(authOptions);

    if (!user) return;
    const newWishlist = await Wishlist.find({ userEmail: user.email })
      .populate("product")
      .exec();

    return new Response(JSON.stringify(newWishlist), { status: 200 });
  } catch (error) {
    return new Response("願望清單獲取失敗", { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();
    const { userEmail, product } = await req.json();

    const wishlistExisted = await Wishlist.findOne({
      userEmail: userEmail,
      product,
    });

    if (wishlistExisted) {
      await Wishlist.findByIdAndDelete(wishlistExisted._id);

      return new Response(JSON.stringify(wishlistExisted), { status: 200 });
    } else {
      const newWishlist = new Wishlist({ userEmail, product });
      await newWishlist.save();
      return new Response("創造成功", { status: 200 });
    }
  } catch (error) {
    return new Response("更新願望清單失敗", { status: 500 });
  }
};
