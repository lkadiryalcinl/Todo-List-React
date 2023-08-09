import ReactDOM from "react-dom/client";
import * as React from 'react'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux'
import Routes from "./Routes";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

export default function App() {
  const queryClient = new QueryClient()

  return (
    <BrowserRouter >
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
