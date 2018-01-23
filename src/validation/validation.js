export default validate = values => {
	const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
	const error = {};
	error.email = '';
	error.password = '';
	error.confirmPassword = '';

	error.email = !values.email
		? 'Email field is required'
		: !emailRegex.test(values.email)
		? 'Email format is invalid'
		: undefined;

	error.password = !values.password
		? 'Password field is required'
		: values.password.length < 6
		? 'Password must be at least 6 char long'
		: undefined

	error.confirmPassword = !values.confirmPassword
		? 'Confirm Password is Required'
		: values.password.length !== values.confirmPassword.length
		? 'Password must match'
		: undefined

	return error;
}