const fs = require("fs");
const axios = require("axios");
const dotenv = require("dotenv");
var cron = require("node-cron");
dotenv.config();

//ON start execute hit node-red once
const { exec } = require("child_process");

exec("node-red", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`Node-red is hopefuly running: ${stdout}`);
});

const mainLogic = async () => {
  console.log("Spouštím měření!");
  //WARNING!!! Make sure the path to the source data is correct!
  const data = fs.readFileSync("weatherdata.txt");
  if (data.toString().length > 0) {
    try {
      //1. generate access token first
      const response = await axios.post(
        "https://vpsli4228.a24vps.com/uuiot/auth/gateway-signin",
        {
          name: process.env.GW_USERNAME,
          password: process.env.GW_PASSWORD,
        }
      );
      //2. save token into variable
      const signToken = response.data.gateway_access_token;
      //3. Send buffer data to the server so it can parse it.
      const saveData = await axios.post(
        "https://vpsli4228.a24vps.com/uuiot/gateway/save",
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
