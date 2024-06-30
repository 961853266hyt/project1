import * as ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';

const thunk = ReduxThunk.default || ReduxThunk;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;