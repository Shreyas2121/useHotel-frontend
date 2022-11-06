import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./customHook/ScrollToTop";
import axios from "axios";
import store from "./store/store";
import { Provider } from "react-redux";
import Loader from "./Loader";
axios.defaults.baseURL = `${import.meta.env.VITE_USEHOTEL_BACKEND}`;

let persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
