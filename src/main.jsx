import "./init";
import React from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { addProtocol, setWorkerUrl } from "maplibre-gl";
// eslint-disable-next-line import/no-unresolved, import/extensions
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { Protocol } from "pmtiles";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";

import App from "./App.jsx";
import { store } from "./store";

ReactGA.initialize("G-2E98LXVQPJ");
ReactGA.send("pageview");

setWorkerUrl(maplibreWorkerUrl);
addProtocol("pmtiles", new Protocol().tile);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
