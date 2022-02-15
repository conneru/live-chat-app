import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import chatReducer from "./chats";
import messageReducer from "./messages";
const rootReducer = combineReducers({
  session: sessionReducer,
  chatReducer,
  messageReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// let enhancer = composeEnhancers(applyMiddleware(thunk));
let enhancer = applyMiddleware(thunk);

const store = createStore(rootReducer, enhancer);

export default store;
