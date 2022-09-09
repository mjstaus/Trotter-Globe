import { ethers } from "ethers";
import loadContracts from "./loadContracts";

export default async function loadPurchasedItems(account: string | undefined) {

  const { shop, token } = await loadContracts();

  let purchasedItems = [];
  try {
      const itemCount = await shop.callStatic.itemCount();
  
      for (let i = 1; i <= Number(itemCount.toString()); i++) {
        const item = await shop.callStatic.items(i);
  
        if (item.owner === account) {
          
          purchasedItems.push({
            price: ethers.utils.formatEther(item?.price),
            owner: item?.owner,
            itemId: item?.itemId,
            city: item?.city,
            image: `https://gateway.pinata.cloud/ipfs/${item?.image}.png`,
          });
        }
      }
      return purchasedItems;
    } catch (error) {
      console.log("Error", error);
    }
};