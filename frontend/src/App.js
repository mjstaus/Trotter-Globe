//shows routers, should not have logic
//ie. nft/:id
// <Route path="/products" element={ <Dashboard /> } />
//example github https://github.com/pedroagont/ecommerce-frontend-g7/blob/dev/src/App.js
//import logo from './logo.svg';
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import esriConfig from "@arcgis/core/config.js";

import Homepage from "./views/Homepage";
import NftGallery from "./views/NftGallery";
import NftBuyItem from "./views/NftBuyItem";
import PersonalCollection from "./views/PersonalCollection";
import SimpleGlobe from "./components/globe";
import SceneView from "./components/SceneView";

import useWeb3 from "./hooks/useWeb3";

esriConfig.assetsPath = "./assets";

function App() {
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    web3Handler();
  }, []);

  const { account, store, nft, web3Handler } = useWeb3();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Homepage alert={alert} setAlert={setAlert} />}
        />
        <Route
          path="/nftglobegallery"
          element={
            <NftGallery
              account={account}
              web3Handler={web3Handler}
              nft={nft}
              store={store}
            />
          }
        />
        <Route
          path="/nftbuyitem"
          element={<NftBuyItem alert={alert} setAlert={setAlert} />}
        />
        <Route path="/personalcollection" 
        element={<PersonalCollection 
          account={account}
          web3Handler={web3Handler}
          nft={nft}
          store={store}
        />} />
        <Route path="/globe" element={<SimpleGlobe />} />
        <Route path="/esri" element={<SceneView />} />
      </Routes>
    </Router>
  );
}

export default App;
