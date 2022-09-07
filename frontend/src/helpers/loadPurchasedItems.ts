import { ethers } from "ethers";
import axios from "axios";
import loadContracts from "./loadContracts";

export default async function loadPurchasedItems(account: string | undefined) {
  const { shop, token } = await loadContracts();

  let purchasedItems = [];
  try {
    const itemCount = await shop.callStatic.itemCount();

    for (let i = 1; i <= Number(itemCount.toString()); i++) {
      const item = await shop.callStatic.items(i);
      // get uri url from token contract
      const uri = await token.uri(item.tokenId);
      // use uri to fetch the token metadata stored on ipfs
      const response = await axios.get(
        `https://gateway.pinata.cloud/ipfs/${uri}.json`
      );
      const metadata = await response.data;

      if (item.owner === account) {
        // Add item to items array
        console.log("item", item);
        purchasedItems.push({
          price: ethers.utils.formatEther(item?.price),
          owner: item?.owner,
          itemId: item?.itemId,
          name: metadata?.name,
          description: metadata?.description,
          image: `https://gateway.pinata.cloud/ipfs/${metadata?.image}.png`,
        });
      }
    }
    return purchasedItems;
  } catch (error) {
    console.log("Error", error);
  }
}
