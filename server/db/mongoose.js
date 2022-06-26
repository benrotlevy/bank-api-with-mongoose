import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connection = process.env.MONGOOSE_URI;

mongoose.connect(
  connection,
  {
    autoIndex: true,
  },
  (error, mongoConnectionInstance) => {
    if (error) throw Error("Mongoose Connection!!, Error: " + error);
    if (!process.env.NODE_ENV) {
      const { host, port, name } = mongoConnectionInstance;
      console.log({ host, port, name });
    }
  }
);
