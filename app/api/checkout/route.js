import Clothes from "@models/clothes";
import Order from "@models/order";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  try {
    await connectToDB();
    const {
      cartProducts,
      userId,
      name,
      email,
      phone,
      postCode,
      address,
      totalProductPrice,
      totalBillPrice,
      totalDiscount,
    } = await req.json();
    const prodIds = cartProducts;
    // 移除重複id
    const uniqueIds = [...new Set(prodIds)];
    const prodInfos = await Clothes.find({ _id: uniqueIds });

    let orderItem = [];

    for (const prodId of uniqueIds) {
      const prodInfo = prodInfos.find((p) => p._id.toString() === prodId);
      const quantity = prodIds.filter((id) => id === prodId)?.length || 0;
      if (quantity > 0 && prodInfo) {
        orderItem.push({
          quantity,
          image: prodInfo.image,
          url: prodInfo._id,
          price_data: {
            currency: "NTD",
            product_data: { name: prodInfo.title },
            totalPrice: quantity * prodInfo.price,
          },
        });
      }
    }

    const newOrder = new Order({
      orderItem,
      userId,
      name,
      email,
      phone,
      postCode,
      address,
      totalProductPrice,
      totalBillPrice,
      totalDiscount,
      paid: false,
    });

    await newOrder.save();

    return new Response(JSON.stringify(newOrder), { status: 201 });
  } catch (error) {
    throw new Error(error);
  }
};
