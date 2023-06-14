import Clothes from "@models/clothes";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);

    const sortBy = searchParams.get("sortby");

    const sortOptions = {
      priceasc: { price: 1 },
      pricedesc: { price: -1 },
      // 後續視情況新增依據時間排序
      // dateasc: { createdAt: 1 },
      // datedesc: { createdAt: -1 },
    };

    const sort = sortOptions[sortBy];
    const clothes = await Clothes.find({ category: "men" })
      .sort(sort)
      .collation({ locale: "zh_Hant", numericOrdering: true });

    return new Response(JSON.stringify(clothes), { status: 200 });
  } catch (error) {
    return new Response("數據獲取失敗", { status: 500 });
  }
};
