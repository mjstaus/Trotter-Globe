export default function ConnectCard() {
  return (
    <div className="flex flex-col items-center pt-24 min-h-screen justify-start">
      <div className="card w-96 bg-base-100 shadow-xl my-10">
        <figure className="w-100 pt-10 flex justify-between">
          <img src="pig-logo.png" alt="Trotter-logo" className="pr-2"/>
          <img src="border-dotted-svgrepo-com.svg" alt="dotted-line" />
          <img src="border-dotted-svgrepo-com.svg" alt="dotted-line" />
          <img src="border-dotted-svgrepo-com.svg" alt="dotted-line" />
          <img src="polygon-token.png" alt="Polygon-logo" className="pl-2" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-white">Please connect your wallet!</h2>
        </div>
      </div>
    </div>
  );
}
