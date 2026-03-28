import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();

  const [deployer] = await ethers.getSigners();
  console.log("Deploying TUFT token with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  const tuft = await ethers.deployContract("TuftToken", [deployer.address]);
  await tuft.waitForDeployment();

  const address = await tuft.getAddress();
  console.log("TuftToken deployed to:", address);
  console.log("Initial supply (owner):", ethers.formatUnits(await tuft.balanceOf(deployer.address), 18), "TUFT");
  console.log("Max supply:", ethers.formatUnits(await tuft.MAX_SUPPLY(), 18), "TUFT");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
