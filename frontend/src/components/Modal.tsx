import { useEffect } from "react";
import { Marker } from "../interfaces";

interface ModalProps {
  handleHideModal: () => void;
  handleTransaction: () => void;
  nft: Marker | undefined ;
  userLocation: string | undefined ;
}

export default function Modal({
  handleHideModal,
  handleTransaction,
  nft,
  userLocation,
}: ModalProps) {

  const keydownHandler = ({ key } : any) => {
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
      <div className="card card-compact w-96 bg-white rounded-sm shadow-custom-lg transition ease-in-out duration-360 hover:scale-10003 hover:-translate-y-1 mr-10 mt-1 z-50">
        <figure className="p-5">
          <img
            className="brightness-75 shadow-inner"
            src={`/images/thumbnails/${nft?.name?.toLowerCase().split(" ").join("-")}.jpg`}
            alt={nft?.name}
          />
        </figure>
        <div className="card-body flex-row justify-between bg-white">
          <div className="flex-column">
            <h2 className="card-title font-urbanist text-black text-3xl">
              {nft?.name}
              {nft?.sold && (
                <div className="badge badge-secondary">SOLD OUT</div>
              )}
            </h2>
            <p>Trotter {nft?.collection} 2022 Collection</p>
          </div>
          {!nft?.sold && userLocation === nft?.name && (
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
              <button
                className="btn btn-primary"
                onClick={() => handleTransaction()}
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
