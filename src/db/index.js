import mongoose from "mongoose";
import { config } from "../config";

const mongoClient = async () => {
  try {
   await mongoose.connect(config.dbUrl);
    console.log("mongo is conected");
  } catch (error) {
    console.log("Error in mongo", error);
  }
};

export default mongoClient;