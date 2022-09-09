import { ethers, providers } from "ethers";

import ShopAddress from "../contractsData/Shop-address.json";
import ShopABI from "../contractsData/Shop.json";
import TokenAddress from "../contractsData/Token-address.json";
import TokenAbi from "../contractsData/Token.json";

export default async function loadContracts() {
  let shop;
  let token;

  const provider = new providers.Web3Provider(window.ethereum as any);
  const signer = provider.getSigner();

  const { chainId } = await provider.getNetwork();
  if (chainId !== 80001) {
    window.alert("Please switch to the Polygon network!");
    throw new Error("Please switch to the Polygon network");
  }

  // Get deployed copies of contracts
  const shopContract = new ethers.Contract(
    ShopAddress.address,
    ShopABI.abi,
    signer
  );
  shop = shopContract;
  const tokenContract = new ethers.Contract(
    TokenAddress.address,
    TokenAbi.abi,
    signer
  );
  token = tokenContract;

  return { token, shop };
};
