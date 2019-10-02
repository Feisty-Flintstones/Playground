import { createStore, combineReducers } from "redux";
// import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./userReducer";

const reducer = combineReducers({
  userReducer
});
// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, thunkMiddleware);

export default store;
export * from "./userReducer";
