import User from "@models/user";
import { connectToDB } from "@utils/database";
import { hash } from "bcrypt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// 得到使用者資訊
export const GET = async (req) => {
  try {
    await connectToDB();

    const { user } = await getServerSession(authOptions);
    if (!user) return;
    const existedUser = await User.findOne({ email: user?.email });

    if (existedUser.length === 0) return;

    return new Response(JSON.stringify(existedUser), { status: 200 });
  } catch (error) {
    return new Response("搜尋用戶失敗", { status: 500 });
  }
};

// 註冊使用者
export const POST = async (req) => {
  try {
    await connectToDB();
    const { username, email, password } = await req.json();
    const existedUser = await User.find({ email });
    const hashPassword = await hash(password, 12);

    // 找不到使用者，創建使用者
    if (existedUser.length === 0) {
      const newUser = new User({
        email,
        username,
        password: hashPassword,
        image: null,
      });
      await newUser.save();
      return new Response(JSON.stringify(newUser), { status: 201 });
    }

    // 找到使用者，直接返回
    if (existedUser.length > 0) return;
  } catch (error) {
    return new Response("創建失敗", { status: 500 });
  }
};

// 更新使用者資訊
export const PUT = async (req) => {
  try {
    await connectToDB();
    const { username, email, _id } = await req.json();

    const existedUser = await User.updateOne({ _id }, { email, username });

    return new Response("更新成功", { status: 201 });
  } catch (error) {
    return new Response("創建失敗", { status: 500 });
  }
};
