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

const updateMetadataService = async () => {
  try {
    const totalSupply = await contract.getTotalSupply();
    console.log(totalSupply);

    for (let i = 0; i < totalSupply; i++) {
      const tokenInfo = await contract.getTokenInfo(i + 1);
      jsonHandler.exportJson(
        i + 1,
        tokenInfo.minerType,
        tokenInfo.hashrate,
        tokenInfo.amount
      );
    }
    return true;
  } catch (err) {
    return false;
  }
};

updateMetadataService();
setInterval(updateMetadataService, 3600000); // update metadata every one hour

// router
app.post("/api/updateMetadata", async (req, res) => {
  console.log("=== updateMetadata api is called ===");
  const updated = updateMetadataService();
  if (updated) res.json({ status: "success" });
  else res.json({ status: "fail" });
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
