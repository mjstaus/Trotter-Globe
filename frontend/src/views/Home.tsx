import { useState, useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import "../App.css";
import { Transition } from "@headlessui/react";
import Alert from "../components/Alert";
import ConnectCard from "../components/ConnectCard";
import Globe from "../components/globe";
import Modal from "../components/Modal";
import TransactionProgress from "../components/TransactionProgress";
import { useAccount } from "wagmi";
import { providers } from "ethers";

import useLoading from "../hooks/useLoading";
import buyShopItem from "../helpers/buyShopItem";
import { getMarkers } from "../helpers/getMarkers";
import { AlertData, Location, Marker, Ref } from "../interfaces";

interface HomeProps {
  location: Location;
  globeEl: Ref;
}

function Home({ globeEl, location }: HomeProps) {
  const [alertData, setAlertData] = useState<AlertData | undefined>(undefined);
  const [chain, setChain] = useState<number | undefined>(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nft, setNft] = useState<Marker | undefined>(undefined);
  const [transactionInProgress, setTransactionInProgress] = useState(false);

  const { isLoaded, setIsLoaded } = useLoading();
  const [markers, setMarkers] = useState<Marker[] | undefined>(undefined);

  const { data } = useAccount();

  useEffect(() => {
    async function populateMarkers() {
      try {
        const updatedMarkers = await getMarkers();
        setMarkers(updatedMarkers);
        if (updatedMarkers?.length) setIsLoaded(true);
      } catch (error) {
        console.log(error);
        setIsLoaded(false);
      }
    }

    async function chainHandler() {
      const provider = new providers.Web3Provider(window.ethereum as any);
      const { chainId } = await provider.getNetwork();
      setChain(chainId);
    }

    chainHandler();

    if (!!data && !markers && !!location?.coordinates?.lat) {
      populateMarkers();
    }

    // Trigger reload on account or chain change
    if (window.ethereum) {
      (window.ethereum as any).on("chainChanged", () => {
        window.location.reload();
      });
      (window.ethereum as any).on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, [data, location]);

  const handleTransaction = async () => {
    setTransactionInProgress(true);
    if (nft) {
      const result = await buyShopItem(nft);
      if (result) {
        setTimeout(() => {
          setTransactionInProgress(false);
          setShowModal(false);
          handleShowAlert(result);
          setIsLoaded(false);
        }, 200);
      }
    }
  };

  const handleShowModal = (d: Marker) => {
    setShowModal(true);
    setNft(d);
  };

  const handleHideModal = () => {
    const { lat, lng } = globeEl.current.pointOfView();
    const ROTATION_SPEED = 280;
    setTimeout(() => {
      setShowModal(false);
      globeEl.current.pointOfView({ lat, lng, altitude: 2.5 }, ROTATION_SPEED);
    }, 200);
  };
  const handleShowAlert = (d: any) => {
    setShowAlert(true);
    setAlertData(d);
  };
  const handleHideAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {!data?.address && (
        <ConnectCard message={"Please connect your wallet!"} />
      )}

      {chain !== 137 && <ConnectCard message={"Please connect to Polygon!"} />}

      {!isLoaded && data?.address && (
        <div className="flex justify-center items-center h-screen">
          <img
            src="pig-spinner.png"
            className="animate-spin-slow"
            alt="Trotter-logo-spinner"
          />
        </div>
      )}

      {isLoaded && data?.address && (
        <>
          <Globe
            globeEl={globeEl}
            handleShowModal={handleShowModal}
            markers={markers}
            userLocation={location}
          />
        </>
      )}
      <Transition show={showModal}>
        <Transition.Child
          enter="transform transition duration-[600ms]"
          enterFrom="scale-0"
          enterTo="scale-100"
          leave="ease-in duration-[300ms]"
          leaveFrom="scale-100"
          leaveTo="scale-0"
          className="fixed inset-0 h-screen z-50 flex justify-center items-center"
          onClick={() => {
            handleHideModal();
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <button
              className="btn btn-sm btn-circle self-end"
              onClick={handleHideModal}
            >
              x
            </button>

            <div
              className="modal-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Modal
                handleHideModal={handleHideModal}
                nft={nft}
                userLocation={location.city}
                handleTransaction={handleTransaction}
              />
            </div>
          </div>
        </Transition.Child>
        <Transition.Child
          enter="transition-opacity ease-linear duration-[200ms]"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="transition-opacity ease-linear duration-[200ms]"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
          className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-black"
        ></Transition.Child>
      </Transition>
      <Transition
        show={transactionInProgress}
        enter="transform transition ease-in duration-[300ms]"
        enterFrom="scale-0"
        enterTo="scale-100"
        leave="ease-in duration-[300ms]"
        leaveFrom="scale-100"
        leaveTo="scale-0"
        className="z-50 w-40 p-2 absolute bottom-6 right-6 flex flex-col justify-center items-center"
      >
        <TransactionProgress />
      </Transition>
      <Transition show={showAlert}>
        <Transition.Child
          enter="transform transition duration-[600ms]"
          enterFrom="scale-0"
          enterTo="scale-100"
          leave="ease-in duration-[300ms]"
          leaveFrom="scale-100"
          leaveTo="scale-0"
          className="fixed inset-0 h-screen z-50 flex justify-center items-center"
          onClick={() => {
            handleHideAlert();
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <button
              className="btn btn-sm btn-circle self-end"
              onClick={handleHideAlert}
            >
              x
            </button>

            <div
              className="modal-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Alert handleHideAlert={handleHideAlert} alertData={alertData} />
            </div>
          </div>
        </Transition.Child>
        <Transition.Child
          enter="transition-opacity ease-linear duration-[200ms]"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="transition-opacity ease-linear duration-[200ms]"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
          className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-black"
        ></Transition.Child>
      </Transition>
    </>
  );
}

export default Home;
