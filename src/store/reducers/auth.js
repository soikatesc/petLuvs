import { DUMMUY_ACTION } from '../actions/actionTypes';

const initialState = {
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case DUMMUY_ACTION:
			return state;
		default: 
			return state;
	}
};

export default reducer;