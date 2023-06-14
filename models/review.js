import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    stars: { type: Number },
    productId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", ReviewSchema);

export default Review;
