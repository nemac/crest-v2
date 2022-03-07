import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from './store'
import { Provider } from 'react-redux'
import { saveState } from './localStorage'

// here we subscribe to the store changes
store.subscribe(() => { saveState(store.getState()) });

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