import { createStore, combineReducers, applyMiddleware } from "redux";
// import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./userReducer";

import mapReducer from "./mapReducer";

import objReducer from "./objReducer";

const reducer = combineReducers({
  userReducer, objReducer, mapReducer
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, middleware);
// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

export default store;
export * from "./userReducer";
