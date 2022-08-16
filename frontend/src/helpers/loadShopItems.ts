import { ethers } from "ethers";
import axios from "axios";
import loadContracts from "./loadContracts";

export default async function loadShopItems() {
  const { token, shop } = await loadContracts();
  // load all items
  let items = [];
  try {
    const itemCount = await shop.callStatic.itemCount();

    for (let i = 1; i <= Number(itemCount.toString()); i++) {
      const item = await shop.callStatic.items(i);
      // get uri url from token contract
      const uri = await token.uri(item.tokenId);
      // use uri to fetch the token metadata stored on ipfs
      const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${uri}.json`);
      const metadata = await response.data;

      if (!item.sold) {
        // Add item to items array
        items.push({
          price: ethers.utils.formatEther(item.price),
          itemId: item.itemId._hex,
          seller: item.seller,
          collection: item.collection,
          sold: item.sold,
          name: metadata.name,
          country: metadata.country,
          image: `https://gateway.pinata.cloud/ipfs/${metadata.image}.png`,
        });
      }
    }

    // Sort items array by sold property value
    items.sort((a, b) => a.sold - b.sold);
    // Filter out duplicate items by name property
    items = items.filter(
      (item, index, array) =>
        index === array.findIndex((i) => i.name === item.name)
    );
    return items;
  } catch (error) {
    console.log("Error", error);
  }
}
