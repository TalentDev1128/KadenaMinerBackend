const Web3 = require("web3");
const constants = require("../constants");
const abi = require("../../abi/kor_abi.json");

const web3 = new Web3(constants.rpcURL);

const kor_mining_contract = new web3.eth.Contract(
  abi,
  constants.contract_address
);

const getTotalSupply = async () => {
  try {
    const totalSuppy = await kor_mining_contract.methods.totalSupply().call();
    return totalSuppy;
  } catch (err) {
    return 0;
  }
};

const getTokenInfo = async (index) => {
  try {
    const tokenInfo = await kor_mining_contract.methods
      .tokenIdToMiner(index)
      .call();
    return tokenInfo;
  } catch (err) {
    return null;
  }
};

exports.getTotalSupply = getTotalSupply;
exports.getTokenInfo = getTokenInfo;
