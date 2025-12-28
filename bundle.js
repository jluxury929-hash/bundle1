const { ethers } = require("ethers");
const {
  FlashbotsBundleResolution
} = require("@flashbots/ethers-provider-bundle");
const CONFIG = require("./config");

async function submitBundle({
  provider,
  flashbots,
  signer,
  arbContract,
  blockNumber
}) {
  const targetBlock = blockNumber + 1;

  const tx =
    await arbContract.populateTransaction.executeFlashArbitrage(
      CONFIG.TOKEN_IN,
      CONFIG.TOKEN_OUT,
      CONFIG.LOAN_AMOUNT
    );

  const bundle = [
    {
      signer,
      transaction: {
        ...tx,
        chainId: CONFIG.CHAIN_ID,
        type: 2,
        gasLimit: CONFIG.GAS_LIMIT,
        maxFeePerGas: ethers.parseUnits(CONFIG.MAX_FEE_GWEI, "gwei"),
        maxPriorityFeePerGas: ethers.parseUnits(
          CONFIG.PRIORITY_FEE_GWEI,
          "gwei"
        )
      }
    }
  ];

  const simulation = await flashbots.simulate(bundle, targetBlock);

  if ("error" in simulation) {
    console.log("❌ Simulation failed:", simulation.error.message);
    return;
  }

  console.log(
    `🧪 Simulation OK | Gas: ${simulation.totalGasUsed.toString()}`
  );

  const response = await flashbots.sendBundle(bundle, targetBlock);
  const resolution = await response.wait();

  if (resolution === FlashbotsBundleResolution.BundleIncluded) {
    console.log("🚀 Bundle included in block", targetBlock);
  } else {
    console.log("⏭ Bundle not included");
  }
}

module.exports = { submitBundle };
