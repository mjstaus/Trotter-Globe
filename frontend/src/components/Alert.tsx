import { useEffect } from "react";
import { AlertData } from "../interfaces";

interface AlertProps {
  handleHideAlert: () => void;
  alertData: AlertData | undefined;
}

export default function Alert({ handleHideAlert, alertData }: AlertProps) {
  {
    console.log("alertData:", alertData);
  }
  const keydownHandler = ({ key }: any) => {
    switch (key) {
      case "Escape":
        handleHideAlert();
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
      <div className="card card-compact w-96 bg-purple-400 text-black rounded-md shadow-custom-lg z-50 mr-10 mt-1">
        <div className="card-body">
          {alertData?.code && (
            <>
              <h2 className="card-title">Transaction Unsuccessful!</h2>
              <p>Error code: {alertData?.code}</p>
            </>
          )}
          {alertData?.blockHash && (
            <>
              <h2 className="card-title">Transaction Successful!</h2>
            </>
          )}
        </div>
      </div>
    </>
  );
}
