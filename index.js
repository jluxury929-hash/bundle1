const fs = require("fs");

console.log("🚀 Booting Flashbots MEV bot…");
console.log("📂 CWD:", process.cwd());

if (!fs.existsSync("./src/index.js")) {
  console.error("❌ FATAL: src/index.js not found in container");
  process.exit(1);
}

const { initProviders } = require("./provider");
const { loadContracts } = require("./contracts");
const { submitBundle } = require("./bundle");

async function main() {
  const { provider, signer, flashbots } = await initProviders();
  const { arbContract } = loadContracts(signer);

  console.log("✅ Filesystem OK");
  console.log("🔑 Searcher:", signer.address);

  provider.on("block", async (blockNumber) => {
    try {
      console.log(`⛏ Block ${blockNumber}`);
      await submitBundle({
        provider,
        signer,
        flashbots,
        arbContract,
        blockNumber
      });
    } catch (err) {
      console.error("🔥 Runtime error:", err.message);
    }
  });
}

main().catch((err) => {
  console.error("❌ Fatal startup error:", err);
  process.exit(1);
});
