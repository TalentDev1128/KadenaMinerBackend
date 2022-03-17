const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const constants = require("./src/constants");
const contract = require("./src/contract");
const jsonHandler = require("./src/json_handler");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router
app.get("/api/updateBaseURI", async (req, res) => {
  console.log("=== updateBaseURI api is called ===");
  try {
    const totalSupply = await contract.getTotalSupply();

    for (let i = 0; i < totalSupply; i++) {
      const tokenInfo = await contract.getTokenInfo(i + 1);
      jsonHandler.exportJson(
        i + 1,
        tokenInfo.minerType,
        tokenInfo.hashrate,
        tokenInfo.amount
      );
    }
    res.json({ status: "success" });
  } catch (err) {
    res.json({ status: "fail" });
  }
});

app.get("/api/nft/:id", async (req, res) => {
  const id = req.params.id;
  const file = path.join(constants.jsonPath, id.toString());
  const rawData = fs.readFileSync(file);
  const json = JSON.parse(rawData);
  res.json(json);
});

app.listen(process.env.PORT, () =>
  console.log("Your app is listening on port " + process.env.PORT)
);
