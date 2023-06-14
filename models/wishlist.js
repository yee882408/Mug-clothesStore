import mongoose, { Schema, model, models } from "mongoose";

// const WishlistSchema = new Schema({
//   userId: { type: String },
//   productId: { type: String },
//   title: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: [{ type: String }],
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

const WishlistSchema = new Schema({
  userEmail: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Clothes" },
});

const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);

export default Wishlist;
