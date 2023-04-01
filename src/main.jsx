import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider, useDispatch } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { fetchUser } from "./features/Admin/allUserSlice";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

store.dispatch(fetchUser);

if (process.env.NODE_ENV == "production") disableReactDevTools();
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </BrowserRouter>
);
