import "./init";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";

import App from "./App.jsx";
import { store } from "./store";
import { saveState } from "./localStorage";

ReactGA.initialize("G-2E98LXVQPJ");
ReactGA.send("pageview");

// here we subscribe to the store changes
store.subscribe(() => {
  saveState(store.getState());
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
