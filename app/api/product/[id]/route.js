import Clothes from "@models/clothes";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const clothes = await Clothes.findById({ _id: params.id });
    return new Response(JSON.stringify(clothes), { status: 200 });
  } catch (error) {
    return new Response("數據獲取失敗", { status: 500 });
  }
};
