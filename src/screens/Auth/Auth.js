import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import InstagramLogin from 'react-native-instagram-login';
import { Field, reduxForm } from 'redux-form';
import { Container, Content, Form, Item, Input, Label, Button, Text, Icon } from 'native-base';

import startMainTabs from '../MainTabs/startMainTabs';
import validateInput from '../../validation/validation';
import { tryAuth } from '../../store/actions/index';
import validate from '../../validation/validation';

class AuthScreen extends Component {
	constructor(props) {
		super(props);
		this.renderInput = this.renderInput.bind(this);
	}

	state = {
		errors: {},
		isLoading: false
	}

	loginHandler = (values) => {
		// startMainTabs();
		console.log(values);
	}

	renderInput = props => {
		const { input,onChange, onBlur, onFocus, value, label, meta: { touched, error, warning} } = props;
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
					{...input} />
				{hasError ? <Text>{error}</Text> : <Text />}
			</Item>
		)
	}
	render() {
		console.log(this.props);
		const { handleSubmit, invalid } = this.props;
		return (
			<Container style={styles.container}>
				<Content padder>
					<Form style={styles.formStyle} >
						<Field 
							name="email"
							label="Email"
							type="email"
							component={this.renderInput}/>						
						<Field 
							name="password"
							label="Password"
							type="password"
							component={this.renderInput}/>
						<Field 
							name="confirmPassword"
							label="Password Confirmation"
							type="password"
							component={this.renderInput}/>
					</Form>
					<Button
						disabled={invalid}
						onPress={handleSubmit(this.loginHandler)} 
						full style={{ margin: 5}}>
						<Text>Sign In</Text>
					</Button>
					<FBLogin
						permissions={["email", "public_profile"]} 
						loginBehavior={FBLoginManager.LoginBehaviors.Native}
						onLogin={(data) => console.log(data)}
						onLogout={() => console.log("Logged Out")}/>
				</Content>
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

const mapDispatchToProps = dispatch => {
	return {
		onLogin: (authData) => dispatch(tryAuth(authData))
	}
}

export default reduxForm({
	form: 'auth',
	validate
})(AuthScreen);

