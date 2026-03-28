import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: {
    version: "0.8.28",
  },
  networks: {
    // Add external networks here (e.g. sepolia, mainnet) with your RPC URLs and private keys
    // sepolia: {
    //   type: "http",
    //   url: process.env.SEPOLIA_RPC_URL ?? "",
    //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    // },
  },
});
