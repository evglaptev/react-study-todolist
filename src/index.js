import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import todoReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import * as firebase from "firebase";

const store = createStore(
  todoReducer(firebase),
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App firebase={firebase} />
  </Provider>,
  document.getElementById("root")
);
