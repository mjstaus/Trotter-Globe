import { useEffect } from "react";
import { Marker } from "../interfaces";

interface ModalProps {
  handleHideModal: () => void;
  handleTransaction: () => void;
  nft: Marker | undefined;
  userLocation: string | undefined;
}

export default function Modal({
  handleHideModal,
  handleTransaction,
  nft,
  userLocation,
}: ModalProps) {
  const keydownHandler = ({ key }: any) => {
    switch (key) {
      case "Escape":
        handleHideModal();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return (
    <>
      <div className="card card-compact w-96 bg-white rounded-sm shadow-custom-lg transition ease-in-out duration-360 hover:scale-10003 hover:-translate-y-1 mr-10 mt-1 z-50 overflow-visible">
        <figure className="p-5">
          <img
            className="brightness-75 shadow-inner"
            src={`/images/thumbnails/${nft?.city
              ?.toLowerCase()
              .split(" ")
              .join("-")}.jpg`}
            alt={nft?.city}
          />
        </figure>
        <div className="card-body flex-row justify-between bg-white">
          <div className="flex-column">
            <h2 className="card-title font-urbanist text-black text-3xl">
              {nft?.city}
              {nft?.sold && (
                <div className="badge badge-secondary">SOLD OUT</div>
              )}
            </h2>
            {userLocation !== nft?.city && (
              <p className="py-2 text-med">
                Visit this city to purchase the collectible!
              </p>
            )}
          </div>
          {!nft?.sold && (
            <div className="card-actions flex flex-col items-center">
              <p className="text-lg">Price</p>
              <div className="flex flex-row items-center">
                <img
                  className="mr-2"
                  src="./polygon-token.png"
                  alt="polygon-token"
                ></img>
                <p className="text-xl text-black">{nft?.price}</p>
              </div>
              {userLocation === nft?.city && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleTransaction()}
                >
                  Buy Now
                </button>
              )}
              {userLocation !== nft?.city && (
                <div
                  className="tooltip tooltip-error"
                  data-tip={`You're not in ${nft?.city}!`}
                >
                  <button className="btn" disabled>
                    Buy Now
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
