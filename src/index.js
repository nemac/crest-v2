import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from './store'
import { Provider } from 'react-redux'
import { saveState } from './localStorage'
import { debounce } from "debounce";

// here we subscribe to the store changes
store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState(store.getState());
  }, 500)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

/*ReactDOM.render(
  <App />,
  document.querySelector("#root")
);*/