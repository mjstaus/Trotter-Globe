import { useRef } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import MyCollection from "./views/MyCollection";
import useGeolocation from "./hooks/useGeolocation";

const infuraId = "447bd0a413c84ff3981cd00b3b7c3029";

const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai, chain.hardhat, chain.localhost, chain.rinkeby],
  [
    infuraProvider({ infuraId }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "Trotter",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App() {

  const globeEl = useRef<HTMLElement>(null!);
  const { location } = useGeolocation();

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#7b3fe4",
          accentColorForeground: "white",
        })}
        chains={chains}
      >
        <HashRouter>
          <div className="bg-black w-full min-h-screen overflow-hidden">
            <Navbar globeEl={globeEl} location={location} />
            <Routes>
              <Route path="/" element={<Home globeEl={globeEl} location={location} />} />
              <Route
                path="/mycollection"
                element={<MyCollection />}
              />
            </Routes>
            <Footer />
          </div>
        </HashRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
