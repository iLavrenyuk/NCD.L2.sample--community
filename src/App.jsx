import React from 'react';
import { Buffer } from 'buffer';
import { StoreProvider } from './store';
import { Router } from './router/Router';
import { BrowserRouter } from 'react-router-dom';

window.Buffer = window.Buffer || Buffer;

export const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StoreProvider>
  );
};
