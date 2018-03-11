import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import todoReducer from "./reducer";
import logger from "./middlewares/logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
const store = createStore(
  todoReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

window.store = store; // for develop

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
