import Clothes from "@models/clothes";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  try {
    await connectToDB();
    const { _id } = await req.json();

    const clothes = await Clothes.find({ _id: _id });
    return new Response(JSON.stringify(clothes), { status: 200 });
  } catch (error) {
    return new Response("數據獲取失敗", { status: 500 });
  }
};
