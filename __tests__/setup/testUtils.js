import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import '@testing-library/jest-dom';
import CustomTheme from '../../src/CRESTTheme/CRESTCustomTheme';
import { setupStore } from '../../src/store';

const store = setupStore();

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => (
    <ThemeProvider theme={CustomTheme}>
      <Provider store={store}>
        {children}
      </Provider>
    </ThemeProvider>
);

// eslint-disable-next-line max-len
const customRender = (ui, options) => ({ store, ...render(ui, { wrapper: AllTheProviders, ...options }) });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
