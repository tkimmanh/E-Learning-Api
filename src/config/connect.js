import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = () => {
  try {
    mongoose.connect(process.env.DB_MONGO_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database error");
  }
};
export default connect;
