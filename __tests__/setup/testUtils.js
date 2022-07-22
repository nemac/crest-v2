import React from 'react';
import {render} from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CustomTheme from '../../src/CRESTTheme/CRESTCustomTheme';
import { setupStore } from '../../src/store';

const store = setupStore();

const AllTheProviders = ({children}) => {
  return (
    <ThemeProvider theme={CustomTheme}>
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) => {
    return {store, ...render(ui, {wrapper: AllTheProviders, ...options})}
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}