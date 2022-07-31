import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { ModalProvider } from "../src/context/Modal";
import { SideModalProvider } from "./context/SideModal/Index";
import configureStore from "./store";
import "./index.css";
import App from "./App";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <SideModalProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </SideModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
