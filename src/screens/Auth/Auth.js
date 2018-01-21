import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Icon } from 'native-base';

import startMainTabs from '../MainTabs/startMainTabs';

class AuthScreen extends Component {
	loginHandler = () => {
		startMainTabs();
	}

	render() {
		return (
			<Container style={styles.container}>
				<Content>
					<Form style={styles.formStyle}>
						<Item floatingLabel>
							<Label>Email</Label>
							<Input />
						</Item>
						<Item floatingLabel>
							<Label>Password</Label>
							<Input />
						</Item>
					</Form>
					<Button
						onPress={this.loginHandler} 
						full style={{ margin: 5}}>
						<Text>Sign In</Text>
					</Button>
					<Button full style={{ margin: 5}}>
						<Icon name='logo-facebook'  />
						<Text>Facebook</Text>
					</Button>
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

export default AuthScreen;