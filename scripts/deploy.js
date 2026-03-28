import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. First, we deploy the Mock USDT contract because the NFT requires a USDT address
  console.log("Deploying Mock USDT...");
  const MockUSDT = await hre.ethers.getContractFactory("MockUSDT");
  const mockUSDT = await MockUSDT.deploy();
  await mockUSDT.waitForDeployment();
  const usdtAddress = await mockUSDT.getAddress();
  console.log("Mock USDT deployed to:", usdtAddress);

  // 2. Deploy the TreasureFunNFT contract
  // Let's set the mint fee to 10 USDT (accounting for 18 decimals)
  console.log("Deploying TreasureFunNFT...");
  const mintFee = hre.ethers.parseUnits("10", 18); 
  const TreasureFunNFT = await hre.ethers.getContractFactory("TreasureFunNFT");
  const nft = await TreasureFunNFT.deploy(usdtAddress, mintFee);
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();

  console.log("-----------------------------------------");
  console.log("Deployment Complete!");
  console.log("Mock USDT Address :", usdtAddress);
  console.log("Treasure Fun NFT  :", nftAddress);
  console.log("-----------------------------------------");
  console.log("To mint an NFT on the frontend, users must:");
  console.log("1. Call approve() on the MockUSDT contract giving the NFT Address an allowance of", mintFee.toString());
  console.log("2. Call mintNFT() on the TreasureFunNFT contract");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});