import ReactDOM from "react-dom/client";
import * as React from 'react'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from './store/index'
import { Provider } from 'react-redux'
import Routes from "./Routes";

export default function App() {
  const queryClient = new QueryClient()
  
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter >
          <Routes />
        </BrowserRouter>
      </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
