import { AUTH_SET_TOKEN, TRY_AUTH } from './actionTypes';
import { uiStopLoading, uiStartLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
	return dispatch => {
		dispatch(uiStartLoading());
		const API_KEY = 'AIzaSyBxZV6mfrslz7PD5-wDqI61Ea3FyKyevGw';
		let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
		if (authMode === "signup") {
			url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
		}

		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: authData.email,
				password: authData.password,
				returnSecureToken: true
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.catch(err => {
			// console.log(err);
			dispatch(uiStopLoading());
			alert("Authentication Failed")
		})
		.then(res => res.json())
		.then(parsedRes => {
			dispatch(uiStopLoading());
			console.log(parsedRes);
			if (!parsedRes.idToken) {
				alert("Authentication Failed")
			} else {
				dispatch(authSetToken(parsedRes.idToken));
				startMainTabs();
			}
		})
	};
};

export const authSetToken = token => {
	return {
		type: AUTH_SET_TOKEN,
		token: token
	}
}


