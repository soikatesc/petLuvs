import { createStore, combineReducers, compose } from 'redux';

import authReducer from './reducers/auth.js';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	auth: authReducer,
	form: formReducer
});

let composeEnhancers = compose;

if (__DEV__) {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
	return createStore(rootReducer, composeEnhancers());
};

export default configureStore;