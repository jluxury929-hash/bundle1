const { ethers } = require("ethers");
const { FlashbotsBundleProvider } = require(
  "@flashbots/ethers-provider-bundle"
);
const CONFIG = require("./config");

async function initProviders() {
  const provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
  const signer = new ethers.Wallet(CONFIG.PRIVATE_KEY, provider);

  // Flashbots identity (NOT the funded key)
  const authSigner = ethers.Wallet.createRandom();

  const flashbots = await FlashbotsBundleProvider.create(
    provider,
    authSigner,
    CONFIG.FLASHBOTS_RELAY,
    CONFIG.CHAIN_ID
  );

  return { provider, signer, flashbots };
}

module.exports = { initProviders };
