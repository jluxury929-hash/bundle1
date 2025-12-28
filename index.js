const { initProviders } = require("./provider");
const { loadContracts } = require("./contracts");
const { submitBundle } = require("./bundle");

async function main() {
  const { provider, signer, flashbots } = await initProviders();
  const { arbContract } = loadContracts(signer);

  console.log("⚡ Flashbots MEV bot started");
  console.log("🔑 Searcher:", signer.address);

  provider.on("block", async (blockNumber) => {
    console.log(`\n⛏ New block: ${blockNumber}`);
    try {
      await submitBundle({
        provider,
        flashbots,
        signer,
        arbContract,
        blockNumber
      });
    } catch (e) {
      console.error("🔥 Error:", e.message);
    }
  });
}

main();
