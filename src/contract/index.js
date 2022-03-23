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

    const mintTime = tokenInfo.mintTime;
    const currentTimeInSec = Math.round(+new Date() / 1000);
    const passedTimeInSec = currentTimeInSec - mintTime;
    const expired = passedTimeInSec > 4 * 365 * 24 * 60 * 60;

    const minerIndex = tokenInfo.index;
    const miner = await kor_mining_contract.methods.miners(minerIndex).call();
    return {
      minerType: miner.minerType,
      hashrate: miner.hashrate,
      amount: tokenInfo.amount,
      mintTime: timeConverter(mintTime),
      expired: expired,
    };
  } catch (err) {
    return null;
  }
};

const timeConverter = (UNIX_timestamp) => {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const time = month + " " + year;
  return time;
};

exports.getTotalSupply = getTotalSupply;
exports.getTokenInfo = getTokenInfo;
