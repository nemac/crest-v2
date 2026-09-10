import "./init";
import React from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { addProtocol } from "maplibre-gl";
import { Protocol } from "pmtiles";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";

import App from "./App.jsx";
import { store } from "./store";

ReactGA.initialize("G-2E98LXVQPJ");
ReactGA.send("pageview");

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
