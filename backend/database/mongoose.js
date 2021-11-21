import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongo = await mongoose.connect("mongodb://127.0.0.1:27017/proshop");

    console.log(`MonogoDB Connected ${mongo.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
