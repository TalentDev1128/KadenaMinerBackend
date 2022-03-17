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
      .tokenIdToToken(index)
      .call();

    const minerIndex = tokenInfo.index;
    const miner = await kor_mining_contract.methods.miners(minerIndex).call();
    return {
      minerType: miner.minerType,
      hashrate: miner.hashrate,
      amount: tokenInfo.amount,
    };
  } catch (err) {
    return null;
  }
};

exports.getTotalSupply = getTotalSupply;
exports.getTokenInfo = getTokenInfo;
