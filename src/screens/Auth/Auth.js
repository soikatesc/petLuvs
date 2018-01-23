import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import InstagramLogin from 'react-native-instagram-login';
import { Field, reduxForm } from 'redux-form';
import { Container, Content, Form, Item, Input, Label, Button, Text, Icon } from 'native-base';

// import startMainTabs from '../MainTabs/startMainTabs';
import { tryAuth } from '../../store/actions/index';
import validate from '../../validation/validation';

class AuthScreen extends Component {
	constructor(props) {
		super(props);
		this.renderInput = this.renderInput.bind(this);
	}

	state = {
		errors: {},
		authMode: "login"
	}

	authHandler = (values) => {
		const authData = {
			email: values.email,
			password: values.password
		}
		this.props.onTryAuth(authData, this.state.authMode);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				authMode: prevState.authMode === "login" ? "signup" : "login"
			}
		})
	}

	renderInput = props => {
		const { keyboardType, autoCorrect, secureTextEntry,input,onChange, onBlur, onFocus, value, label, meta: { touched, error, warning} } = props;
		let hasError = false;
		if(error !== undefined) {
			hasError = true;
		}
		return(
			<Item error={ hasError && touched } floatingLabel>
				<Label>{ label }</Label>
				<Input
					onChangeText={onChange}
					onBlur={onBlur}
					onFocus={onFocus}
					value={value}
					{...input} 
					autoCapitalize="none"
					autoCorrect
					keyboardType={keyboardType}
					secureTextEntry={secureTextEntry}
					/>
				{hasError ? <Text>{error}</Text> : <Text />}
			</Item>
		)
	}
	render() {
		const { handleSubmit, invalid } = this.props;

		let submitButton = (
			<Button
				disabled={invalid}
				onPress={handleSubmit(this.authHandler)} 
				full style={{ margin: 5}}>
				<Text>Sign In</Text>
			</Button>
		)
		if (this.props.isLoading) {
			submitButton = <ActivityIndicator />
		}
		return (
			<Container style={styles.container}>
				<Button onPress={this.switchAuthModeHandler} full>
					<Text>Switch to {this.state.authMode === 'login' ? "Signup" : 'login'}</Text>
				</Button>

				<KeyboardAvoidingView behavior="padding">
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<Form style={styles.formStyle} >
						<Field 
							name="email"
							label="Email"
							type="email"
							component={this.renderInput}
							keyboardType="email-address"
							secureTextEntry={false}
							autoCorrect={false}/>						
						<Field 
							name="password"
							label="Password"
							type="password"
							component={this.renderInput}
							secureTextEntry={true}
							autoCorrect={false}/>
						{ this.state.authMode === 'signup'
						? <Field 
							name="confirmPassword"
							label="Password Confirmation"
							type="password"
							component={this.renderInput}
							secureTextEntry={true}
							autoCorrect={false}/>
						: null
						}
					</Form>
					</TouchableWithoutFeedback>
					{ submitButton }
					<FBLogin
						permissions={["email", "public_profile"]} 
						loginBehavior={FBLoginManager.LoginBehaviors.Native}
						onLogin={(data) => console.log(data)}
						onLogout={() => console.log("Logged Out")}/>
				</KeyboardAvoidingView>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10
	},
	formStyle: {
		marginBottom: 20,
	}
})

const mapStateToProps = state => {
	return {
		isLoading: state.ui.isLoading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))
	}
}

export default reduxForm({
	form: 'auth',
	validate
})(
	connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
);

