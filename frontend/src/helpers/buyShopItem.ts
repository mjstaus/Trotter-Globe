import { ethers } from "ethers";
import loadContracts from "./loadContracts";
import { Marker } from "../interfaces";

export default async function buyShopItem(item: Marker) {
  let receipt = null;

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const price = ethers.utils.parseEther(item.price);

    const contracts = await loadContracts();
    const shop = contracts.shop;
    const purchaseTx = await shop.purchaseItem(item.itemId, {
      value: price,
    });

    const tx = await provider.waitForTransaction(purchaseTx.hash);

    while (receipt === null) {
      receipt = await provider.getTransactionReceipt(tx.transactionHash);

      if (receipt === null) {
        continue;
      }

      window.alert("Purchase Successful!");
      console.log("Purchase Successful!");
    }
  } catch (error: any) {
    window.alert(`Purchase Not Completed: ${error?.message}`);
    console.log("Error", error);
    return error;
  }
  return receipt;
}
