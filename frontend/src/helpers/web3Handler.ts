import { providers } from "ethers";

export default async function web3Handler() {
  // Get provider from Metamask
  const provider = new providers.Web3Provider(window.ethereum as any);
  
  const { chainId } = await provider.getNetwork();
  if (chainId !== 80001) {
    window.alert("Please switch to the Polygon network!");
    throw new Error("Please switch to the Polygon network");
  }

  // Set signer
  const signer = provider.getSigner();

  return signer;
};