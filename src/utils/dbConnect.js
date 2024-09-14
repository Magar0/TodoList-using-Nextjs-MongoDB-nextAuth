import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    console.log("Connected to mongo DB");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
