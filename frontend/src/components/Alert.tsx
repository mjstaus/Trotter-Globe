import { useEffect } from "react";
import { AlertMessage } from "../interfaces";

interface AlertProps {
  handleHideAlert: () => void;
  alertMessage: AlertMessage | undefined;
}

export default function Alert({handleHideAlert, alertMessage}: AlertProps) {
  {console.log("alertMessage:", alertMessage)}
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
      <div className="card card-compact w-96 bg-purple-400 text-black rounded-md shadow-custom-lg z-50">
        <div className="card-body">
          <h2 className="card-title">Transaction Unsuccessful!</h2>
          <p>{alertMessage?.message}</p>
        </div>
      </div>
    </>
  );
}
