import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  try {
    await connectToDB();
    const { userId } = await req.json();

    const [...order] = await Order.find({ userId: userId });
    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new Response("數據傳送失敗", { status: 500 });
  }
};
