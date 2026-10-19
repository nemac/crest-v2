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

import App from "./App.jsx";
import { store } from "./store";
import { initAnalytics } from "./analytics";

initAnalytics();

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
