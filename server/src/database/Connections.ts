import Mongoose from "mongoose";
import { config } from "dotenv";
config();

export const connect = () => {
  return new Promise(async (res, rej) => {
    try {
      const dev_mode = process.env.DEV_MODE;
      if (dev_mode === "development") {
        await Mongoose.connect(process.env.DB_LOCAL).then((status) => {
          console.log("\x1b[42m", "Connected to the local DB.");
          return res(true);
        });
      } else {
        await Mongoose.connect(process.env.DB_PRODUCTION).then((status) => {
          console.log("\x1b[41m", "Connected to the production DB.");
          return res(true);
        });
      }
    } catch (error) {
      if (error) {
        rej(false);
      }
    }
  });
};
