import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { createLogger } from "redux-logger";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import timeReducer from './timeReducer';
import boardReducer from './boardReducer';
import objReducer from './objReducer';
import inventoryReducer from './inventoryReducer';

const reducer = combineReducers({
  timeReducer,
  objReducer,
  boardReducer,
  inventoryReducer
});

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(reducer, middleware);
// const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

export default store;
export * from './timeReducer';
