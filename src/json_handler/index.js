const fs = require("fs");
const path = require("path");
const constants = require("../constants");

const exportJson = (index, minerType, hashRate, amount) => {
  let metaData = {};
  metaData.name = "KOR Miner #" + index;
  metaData.description = "KOR Miner #" + index;
  metaData.image = constants.imagePath + minerType + ".png";
  metaData.attributes = [];

  metaData.attributes.push({
    trait_type: "Type",
    value: minerType,
  });
  metaData.attributes.push({
    trait_type: "HashRate",
    value: hashRate,
  });
  metaData.attributes.push({
    trait_type: "Amount",
    value: amount,
  });

  const outFile = path.join(constants.jsonPath, index.toString());
  fs.writeFile(outFile, JSON.stringify(metaData), (err) => {
    if (err) throw err;
    return;
  });
};

exports.exportJson = exportJson;
