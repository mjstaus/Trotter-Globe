const hre = require("hardhat");
const ethers = hre.ethers;

const tokenAddress = require("../../frontend/src/contractsData/Token-address.json");
const Token = require("../../frontend/src/contractsData/Token.json");
const shopAddress = require("../../frontend/src/contractsData/Shop-address.json");
const Shop = require("../../frontend/src/contractsData/Shop.json");

const data = [
  {
    id: 1,
    city: "Athens",
    country: "GR",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 2,
    city: "Berlin",
    country: "DE",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 3,
    city: "Cairo",
    country: "EG",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 4,
    city: "Bangkok",
    country: "TH",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 5,
    city: "Lisbon",
    country: "PT",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 6,
    city: "New York",
    country: "US",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 7,
    city: "Sydney",
    country: "AU",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 8,
    city: "Paris",
    country: "FR",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 9,
    city: "Rio de Janeiro",
    country: "BR",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 10,
    city: "San Francisco",
    country: "US",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 11,
    city: "Singapore",
    country: "SG",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 12,
    city: "Tokyo",
    country: "JP",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 13,
    city: "Toronto",
    country: "CA",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 14,
    city: "Vancouver",
    country: "CA",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
  {
    id: 15,
    city: "Austin",
    country: "US",
    image: `QmZMyyN4VcHZ2dYyRqvN7KgKDmfqNDJQxifD6QfJDiFQLu/${this.id}`
  },
];

async function list(id, city, country, image) {
  const toWei = (num) => ethers.utils.parseEther(num.toString());

  [deployer] = await ethers.getSigners();

  const token = new ethers.Contract(tokenAddress.address, Token.abi, deployer);
  const shop = new ethers.Contract(shopAddress.address, Shop.abi, deployer);

  const price = 0.01;

  // approve shop to spend nft
  await (
    await token.connect(deployer).setApprovalForAll(shop.address, true)
  ).wait();
  // add nft to shop
  await (
    await shop
      .connect(deployer)
      .makeItem(token.address, id, city, country, image, toWei(price))
  ).wait();
  const itemId = await shop.itemCount();
  const newItem = await shop.items(itemId);
  console.log("New Item:", newItem.city);
  console.log("Shop item count:", itemId);
}

async function main(data) {
  for (const d of data) {
    await list(d.id, d.city, d.country, d.image);
  }
}

main(data)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
