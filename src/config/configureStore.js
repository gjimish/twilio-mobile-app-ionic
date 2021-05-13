import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
const initialState = {};

const middleWare = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    initialState,
    composeEnhancers(applyMiddleware(...middleWare))
  );
}
