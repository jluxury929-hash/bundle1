const { ethers } = require("ethers");
const CONFIG = require("./config");

function loadContracts(signer) {
  const arbContract = new ethers.Contract(
    CONFIG.ARB_CONTRACT,
    [
      "function executeFlashArbitrage(address tokenIn,address tokenOut,uint256 amount) external returns (uint256)"
    ],
    signer
  );

  return { arbContract };
}

module.exports = { loadContracts };
