import { Schema, model, models } from "mongoose";

const ClothesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: [{ type: String }],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Clothes = models.Clothes || model("Clothes", ClothesSchema);

export default Clothes;
