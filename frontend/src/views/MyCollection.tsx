import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { providers } from "ethers";
import useLoading from "../hooks/useLoading";
import loadPurchasedItems from "../helpers/loadPurchasedItems";
import { PurchasedItem } from "../interfaces";
import ConnectCard from "../components/ConnectCard";

export default function MyCollection() {
  const [chain, setChain] = useState<number | undefined>(undefined);
  const { isLoaded, setIsLoaded } = useLoading();
  const { data } = useAccount();

  const [purchases, setPurchases] = useState<
    PurchasedItem[] | null | undefined
  >(null);

  useEffect(() => {
    (async function asyncHandler() {
      try {
        const result = await loadPurchasedItems(data?.address);
        setPurchases(result);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
        setIsLoaded(false);
      }
    })();

    async function chainHandler() {
      const provider = new providers.Web3Provider(window.ethereum as any);
      const { chainId } = await provider.getNetwork();
      setChain(chainId);
    }
    chainHandler();
  }, [data, setIsLoaded]);

  return (
    <>
      {!data?.address && (
        <ConnectCard message={"Please connect your wallet!"} />
      )}

      {chain !== 137 && <ConnectCard message={"Please connect to Polygon!"} />}

      {data?.address && (
        <div className="flex flex-col items-center pt-24 min-h-screen justify-start">
          <div>
            <h2 className="text-4xl text-white pt-10 mb-5">My Collection</h2>
          </div>

          {!isLoaded && (
            <div className="mt-48">
              <img
                src="pig-spinner.png"
                className="animate-spin-slow"
                alt="Trotter-logo-spinner"
              ></img>
            </div>
          )}

          {isLoaded && (
            <div className="container max-w-l mx-auto mt-6 flex flex-wrap flex-col md:flex-row justify-center items-center">
              {purchases?.length && purchases?.length > 0 ? (
                purchases?.map((item, idx) => (
                  <div
                    key={idx}
                    className="card card-compact bg-white rounded-sm m-5 w-72 transition ease-in-out duration-300 hover:scale-10003 hover:shadow-custom-lg"
                  >
                    <figure className="p-3">
                      <img
                        className="shadow-inner"
                        src={`/images/thumbnails/${item?.city
                          ?.toLowerCase()
                          .split(" ")
                          .join("-")}.jpg`}
                        alt={item?.city}
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title font-urbanist text-black">
                        {item.city}
                      </h2>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col my-3 align-top">
                  <p className="text-2xl">
                    {" "}
                    You don't have any items in your collection 😱{" "}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
