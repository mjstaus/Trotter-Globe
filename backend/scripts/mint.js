const hre = require("hardhat");
const ethers = hre.ethers;

const tokenAddress = require("../../frontend/src/contractsData/Token-address.json");
const Token = require("../../frontend/src/contractsData/Token.json");

const n = 15;
const data = Array.from(
  {length: n},
  (_, index) => index + 1
);
const num = Array(n).fill(1)

async function mint(idArray) {

  [deployer] = await ethers.getSigners();

  const token = new ethers.Contract(tokenAddress.address, Token.abi, deployer);

  // mint nft batch
  await token.connect(deployer).mintBatch(deployer.address, idArray, num);


  for (let i = 1; i < idArray.length + 1; i++) {
    const itemBalance = await token.balanceOf(deployer.address, i);
    console.log(`New item - ID:${i}, NUM MINTED:${itemBalance}`);
  }
}

async function main(idArray) {
  await mint(idArray);
}

main(data)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
