import Review from "@models/review";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const param = searchParams.get("productId");

  try {
    await connectToDB();

    const review = await Review.find({ productId: param }, null, {
      sort: { createdAt: -1 },
    });
    return new Response(JSON.stringify(review), { status: 200 });
  } catch (error) {
    return new Response("數據獲取失敗", { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectToDB();
    const { title, name, description, stars, productId } = await req.json();
    const newReview = new Review({
      title,
      name,
      description,
      stars,
      productId,
    });

    await newReview.save();

    return new Response(JSON.stringify(newReview), { status: 201 });
  } catch (error) {
    throw new Error(error);
  }
};
