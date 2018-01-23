import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth.js';
import { reducer as formReducer } from 'redux-form';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
	auth: authReducer,
	form: formReducer,
	ui: uiReducer
});

let composeEnhancers = compose;

if (__DEV__) {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
	return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;