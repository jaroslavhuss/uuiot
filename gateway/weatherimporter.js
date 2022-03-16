const fs = require("fs");
const axios = require("axios");
const dotenv = require("dotenv");
var cron = require("node-cron");

dotenv.config();
const mainLogic = async () => {
  console.log("Spouštím měření!");
  //WARNING!!! Make sure the path to the source data is correct!
  const data = fs.readFileSync("weatherdata.txt");
  try {
    //1. generate access token first
    const response = await axios.post(
      "http://10.0.1.40:5001/auth/gateway-signin",
      {
        name: process.env.GW_USERNAME,
        password: process.env.GW_PASSWORD,
      }
    );
    //2. save token into variable
    const signToken = response.data.gateway_access_token;
    //3. Send buffer data to the server so it can parse it.
    const saveData = await axios.post(
      "http://10.0.1.40:5001/gateway/save",
      {
        data: data.toString(),
      },
      {
        headers: {
          Authorization: "Bearer " + signToken,
        },
      }
    );
    if (saveData) {
      fs.writeFileSync("weatherdata.txt", "");
    }
  } catch (error) {
    auditLog(error.message);
  }
};

cron.schedule("*/30 * * * *", () => {
  console.log("running a task every minute");
  mainLogic();
});

/**
 *
 * @param {string} msg
 * @description if error is thrown, msg with date is saved for later inspection
 */
const auditLog = (msg) => {
  const date = new Date();
  const schema = {
    msg,
    date,
  };
  const string = JSON.stringify(schema) + "\n";
  fs.appendFileSync("logs.txt", string);
};
