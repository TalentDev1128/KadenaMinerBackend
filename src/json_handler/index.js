const fs = require("fs");
const path = require("path");
const constants = require("../constants");

const exportJson = (index, minerType, hashRate, amount, mintTime, expired) => {
  let metaData = {};
  metaData.name = "KOR #" + index;
  metaData.description = "KOR #" + index;
  metaData.image = constants.imagePath + minerType + ".jpeg";
  metaData.attributes = [];

  const newAmount = amount / 4;
  const newHashRate = hashRate * newAmount;

  metaData.attributes.push({
    trait_type: "Type",
    value: minerType,
  });
  metaData.attributes.push({
    trait_type: "HashRate",
    value: newHashRate,
  });
  metaData.attributes.push({
    trait_type: "Amount",
    value: newAmount,
  });
  metaData.attributes.push({
    trait_type: "MintTime",
    value: mintTime,
  });
  metaData.attributes.push({
    trait_type: "Expired",
    value: expired,
  });

  const outFile = path.join(constants.jsonPath, index.toString());
  fs.writeFile(outFile, JSON.stringify(metaData), (err) => {
    if (err) throw err;
    return;
  });
};

exports.exportJson = exportJson;
