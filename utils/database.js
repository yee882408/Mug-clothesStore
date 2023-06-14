import mongoose from "mongoose";
let isConnent = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnent) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "mug",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnent = true;
  } catch (error) {
    console.log(error);
  }
};
