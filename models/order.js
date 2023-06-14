import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  orderItem: { type: Object },
  userId: { type: String },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  postCode: {
    type: String,
  },
  address: {
    type: String,
  },
  totalProductPrice: {
    type: Number,
  },
  totalBillPrice: {
    type: Number,
  },
  totalDiscount: {
    type: Number,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  paid: { type: Boolean },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
