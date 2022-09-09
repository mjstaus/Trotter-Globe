import { ethers } from "ethers";
import loadContracts from "./loadContracts";

export default async function loadShopItems() {
  const { shop } = await loadContracts();

  let items = [];
  try {
    const itemCount = await shop.callStatic.itemCount();

    for (let i = 1; i <= Number(itemCount.toString()); i++) {
      const item = await shop.callStatic.items(i);
      // Add item to items array
      items.push({
        price: ethers.utils.formatEther(item.price),
        itemId: item.itemId._hex,
        seller: item.seller,
        sold: item.sold,
        city: item.city,
        country: item.country,
        image: `https://gateway.pinata.cloud/ipfs/${item.image}`,
      });
    }

    // Sort items array by sold property value
    items.sort((a, b) => a.sold - b.sold);
    // Filter out duplicate items by name property
    items = items.filter(
      (item, index, array) =>
        index === array.findIndex((i) => i.city === item.city)
    );
    return items;
  } catch (error) {
    console.log("Error", error);
  }
}
