import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "此信箱已註冊過!"],
    required: [true, "請註冊信箱!"],
  },
  username: {
    type: String,
    required: [true, "請填寫名稱!"],
  },
  password: {
    type: String,
    required: [true, "請填寫密碼!"],
  },
  image: { type: String },
});

const User = models.User || model("User", UserSchema);

export default User;
