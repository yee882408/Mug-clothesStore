import Clothes from "@models/clothes";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const searchTitle = searchParams.get("title");
    const cate = searchParams.get("category");
    const sortBy = searchParams.get("sortby");

    const productsQuery = {};
    if (cate) {
      const men = cate.substring(0, 3);
      const women = cate.substring(3);
      const categorySplit = [men, women];
      productsQuery.category = categorySplit;
    }

    if (searchTitle) {
      productsQuery["$or"] = [
        { title: { $regex: searchTitle, $options: "i" } },
        { description: { $regex: searchTitle, $options: "i" } },
      ];
    }

    const sortOptions = {
      priceasc: { price: 1 },
      pricedesc: { price: -1 },
      // 後續視情況新增依據時間排序
      // dateasc: { createdAt: 1 },
      // datedesc: { createdAt: -1 },
    };

    const sort = sortOptions[sortBy];

    const clothes = await Clothes.find(productsQuery)
      .sort(sort)
      .collation({ locale: "zh_Hant", numericOrdering: true });

    return new Response(JSON.stringify(clothes), { status: 200 });
  } catch (error) {
    return new Response("數據獲取失敗", { status: 500 });
  }
};
