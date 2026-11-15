const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const contractsDir = path.join(root, "contracts");
const buildDir = path.join(root, "build");
const sources = {};

for (const name of fs.readdirSync(contractsDir)) {
  if (name.endsWith(".sol")) {
    sources[`contracts/${name}`] = {
      content: fs.readFileSync(path.join(contractsDir, name), "utf8"),
    };
  }
}

fs.mkdirSync(buildDir, { recursive: true });
fs.writeFileSync(
  path.join(buildDir, "input.json"),
  JSON.stringify({
    language: "Solidity",
    sources,
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode", "evm.deployedBytecode"],
        },
      },
    },
  }),
);