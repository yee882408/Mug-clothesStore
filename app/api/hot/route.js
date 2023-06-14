import Clothes from "@models/clothes";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    const clothes = await Clothes.find({ category: "hot" });
    return new Response(JSON.stringify(clothes), { status: 200 });
  } catch (error) {
    return new Response("數據獲取失敗", { status: 500 });
  }
};
