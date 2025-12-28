const { ethers } = require("ethers");
require("dotenv").config();

module.exports = {
  CHAIN_ID: 1,
  FLASHBOTS_RELAY: "https://relay.flashbots.net",

  RPC_URL: process.env.ETH_RPC,
  PRIVATE_KEY: process.env.TREASURY_PRIVATE_KEY,

  ARB_CONTRACT: process.env.ARB_CONTRACT,
  TOKEN_IN: process.env.TOKEN_IN,
  TOKEN_OUT: process.env.TOKEN_OUT,

  LOAN_AMOUNT: ethers.parseEther("600"),
  GAS_LIMIT: 900_000,

  MAX_FEE_GWEI: "120",
  PRIORITY_FEE_GWEI: "3"
};
