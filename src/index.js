/**
 * @Author: harsha
 * @Date:   2019-05-13T22:46:53+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-12T16:15:22+05:30
 */

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import "./index.css";
import App from "./App";
import "babel-polyfill";
import "semantic-ui-css/semantic.min.css";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
